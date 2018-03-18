
import Rest from 'react-rest-kit';
import randomUseragent from 'random-useragent';

import QidianClient from '../../qidian.client';
import { db } from '../../db';
import Queue from '../queue';

const _config = Symbol('config');
const _queue = Symbol('queue');

const rest = new Rest({
  contentType: 'application/json',
  dataType: 'text',
});

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class IParser {
  constructor({
    config,
    content_store = false,  // 默认不存储文章内容
  }) {
    if (this.constructor === IParser) {
      throw new TypeError("Can not construct abstract class.");
    }
    if (this.searchBook === IParser.prototype.searchBook) {
      throw new TypeError("Please implement abstract method searchBook.");
    }
    if (this.searchChapters === IParser.prototype.searchChapters) {
      throw new TypeError("Please implement abstract method searchChapters.");
    }
    if (this.parseContent === IParser.prototype.parseContent) {
      throw new TypeError("Please implement abstract method parseContent.");
    }
    if (this.prevChapter === IParser.prototype.prevChapter) {
      throw new TypeError("Please implement abstract method prevChapter.");
    }
    if (this.nextChapter === IParser.prototype.nextChapter) {
      throw new TypeError("Please implement abstract method nextChapter.");
    }

    this[_config] = config;
    this[_queue] = new Queue((data) => {
      this.parseJob(data);
    }, {
        interval: () => {
          return Math.ceil((Math.random() * 100 + 100) * 100);
        }
      });
    this.content_store = content_store;

    this.getKey = this.getKey.bind(this);
    this.getConfig = this.getConfig.bind(this);

    this.obain = this.obain.bind(this);
    this.start = this.start.bind(this);
    this.obainHtml = this.obainHtml.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.searchChapters = this.searchChapters.bind(this);
    this.parseJob = this.parseJob.bind(this);
    this.parseContent = this.parseContent.bind(this);
    this.prevChapter = this.prevChapter.bind(this);
    this.nextChapter = this.nextChapter.bind(this);

    this.findBook = this.findBook.bind(this);
    this.findChapters = this.findChapters.bind(this);
    this.syncChapters = this.syncChapters.bind(this);
    this.syncAllContent = this.syncAllContent.bind(this);
    this.syncContent = this.syncContent.bind(this);
  }

  getKey() {
    return this.getConfig().key;
  }

  getConfig() {
    return this[_config];
  }

  async obain(link, params, method = 'GET', another = {}) {
    const options = {
      ...another,
      headers: {
        'User-Agent': randomUseragent.getRandom(),
        ...(another.headers || {}),
      },
      qsStringifyOptions: {
        encodeURIComponent: uri => uri,     // with no encode
      },
    }

    let result = {};
    if (method === 'POST') {
      result = await rest.rest(link, options);
    } else {
      result = await rest.GET(link, params, options);
    }


    if (result.err) {
      console.error('request get failed ', err);
      return null;
    }

    return result.data;
  }

  /**
   * 开始解析
   */
  async start({ bookId }) {
    // 获取图书信息
    const { qdBookInfo, bookInfo } = await this.findBook(bookId);

    const book = {
      bookId: `${qdBookInfo.BookId}`,
      bookName: qdBookInfo.BookName,
      link: bookInfo.link,
    };

    // 获取并存储章节列表
    await this.findChapters(book);

    if (!this.content_store) {
      await this[_queue].waitAll();
      return true;
    }

    // 缓存章节内容
    await syncContent(book);

  }

  /**
   * 根据连接获取html代码
   * @param {*} link 
   * @param {*} params
   */
  async obainHtml(link, params = {}, method, options) {
    console.log('[IParser] start obain html ', link, params);
    return await this.obain(link, params, method, options);
  }

  async parseJob({ chapter, book }) {
    console.log('[IParser] 开始解析文章内容');
    if (!chapter || !book) {
      console.log('[IParser] 解析文章内容失败，缺少必要参数');
      return false;
    }

    const { bookId, bookName } = book;

    // const chapterLink = `${book.link.startsWith('/') ? book.link : `${book.link}/`}${chapter.link}`;
    const chapterLink = chapter.link;
    console.log('[IParser] 解析文章内容来自', chapterLink);
    const text = await this.parseContent(chapterLink);
    if (!text) {
      // 该章节内容为空
      // TODO 通知管理员，可以进行章节更换
      return false;
    }

    console.log('[IParser] parse success, start persist data into db');
    await db().collection('book_chapter_text').insert({
      _id: `${chapter.id}_${this.getConfig().key}`,
      chapterId: `${chapter.id}`,
      type: this.getConfig().key,
      bookId: `${book.bookId}`,
      bookName: book.bookName,
      title: chapter.title,
      content: text,
    });
  }

  /**
   * 搜索图书信息
   */
  searchBook(bookName) { }

  /**
   * 搜索章节
   */
  searchChapters(link) { }

  /**
   * 解析HTML章节内容
   */
  parseContent(link) { }

  // ==================== public =========================

  /**
   * 查找书籍
   */
  async findBook(bookId) {
    // 获取起点图书信息
    const { data: qdBookInfo, err } = await QidianClient.bookInfo({ bookId });
    if (err) {
      // 获取起点图书信息失败
      // TODO 重新加入缓存队列，等待重新尝试解析
      console.error('[IParser] 获取起点图书信息失败', err);
      return false;
    }

    // 搜索图书信息
    const bookInfo = await this.searchBook(qdBookInfo.BookName);
    if (!bookInfo) {
      // 不存在该本书的信息
      // TODO 发送通知，提醒该书不存在
      console.error('[IParser] 获取源站图书信息失败，该书不存在');
      return false;
    }

    // 存储图书信息
    try {
      await db().collection('book').save({
        ...bookInfo,
        bookId: `${qdBookInfo.BookId}`,
        type: this.getConfig().key,
        _id: `${qdBookInfo.BookId}_${this.getConfig().key}`,
      });
    } catch (dberr1) {
      if (dberr1) {
        console.error('[IParser] 持久化图书信息失败', dberr1);
        return false;
      }
    }

    return {
      qdBookInfo,
      bookInfo,
    }
  }

  async findChapters({
    bookId,
  }) {
    if (!bookId) {
      throw '[IParser] 查询章节缺少必要的图书编号';
    }

    // 获取最新章节
    const { data, err } = await QidianClient.chapters({
      bookId: bookId,
    });

    if (err) {
      throw '[IParser] 查询章节，同步最新列表失败';
    }

    const latestChapter = data.Chapters[data.Chapters.length - 1];
    const result = latestChapter && await db().collection('book_chapters').findOne({ bookId, title: latestChapter.n, type: this.getKey() });
    if (!result) {
      // 最新章节不相同
      await this.syncChapters({ bookId });
    }

    console.log('start sync chapters');
    return await db().collection('book_chapters').find({ bookId, type: this.getKey() }).sort({ sort: 1 }).toArray();
  }

  async syncChapters({
    bookId,   // required
    bookName,
    link,
  }) {
    if (!bookId) {
      throw '[IParser] 查询章节缺少必要的图书编号';
    }

    if (!bookName || !link) {
      // 从数据库中获取图书信息
      const book = await db().collection('book').findOne({ bookId, type: this.getConfig().key });
      if (book) {
        bookName = book.name;
        link = book.link;
      } else {
        // 数据库中不存在则从网络中抓取并缓存
        const { qdBookInfo, bookInfo } = await this.findBook(bookId);
        bookName = qdBookInfo.BookName;
        link = bookInfo.link;
      }
    }

    // 获取老的章节列表
    let oldChapterIds = [];
    try {
      const list = await db().collection('book_chapters').find({ bookId, type: this.getConfig().key }, { _id: 1 }).toArray();
      list.forEach((oldChapter) => {
        oldChapterIds.push(oldChapter._id);
      });
    } catch (dberr4) {
      if (dberr4) {
        console.error('[IParser] 获取图书章节失败', dberr4);
        return false;
      }
    }

    // 搜索该图书的章节列表
    const chapters = await this.searchChapters(link);

    // 存储新的章节信息
    let duplicateIds = [];
    const needToPersist = chapters
      .filter(chapter => {
        if (oldChapterIds.indexOf(`${chapter.id}_${this.getConfig().key}`) === -1 && duplicateIds.indexOf(`${chapter.id}_${this.getConfig().key}`) === -1) {
          duplicateIds.push(`${chapter.id}_${this.getConfig().key}`);
          return true;
        }
        return false;
      })
      .map((chapter, index) => {
        return {
          _id: `${chapter.id}_${this.getConfig().key}`,
          chapterId: `${chapter.id}`,
          type: this.getConfig().key,
          bookId: `${bookId}`,
          bookName,
          title: chapter.title,
          link: chapter.link,
          sort: +chapter.id,
        };
      });
    try {
      needToPersist.length && await db().collection('book_chapters').insertMany(needToPersist);
    } catch (dberr2) {
      if (dberr2) {
        console.error('[IParser] 持久化图书章节失败', dberr2);
        return false;
      }
    }
    console.log('[IParser] 持久化图书章节成功');

    return needToPersist;
  }

  async syncContent({
    bookId,
    chapterId,
  }) {
    if (!chapterId) {
      throw `[IParser] 同步图书章节缺少chapterId`;
    }

    const chapter = await db().collection('book_chapters').findOne({ bookId, chapterId, type: this.getKey() });
    if (!chapter) {
      throw `[IParser] 未找到章节${chapterid}`;
    }

    // 通过章节获取章节内容
    const chapterContent = await db().collection('book_chapter_text').findOne({ bookId, chapterId, type: this.getKey() }, { content: 1, title: 1, _id: 0 });
    if (chapterContent) {
      return chapterContent;
    }

    let book = await db().collection('book').findOne({ bookId, type: this.getKey() });
    if (!book) {
      const { qdBookInfo, bookInfo } = await this.findBook(bookId);
      book = {
        bookId: qdBookInfo.BookId,
        bookName: qdBookInfo.BookName,
        link: bookInfo.link,
      };
    }

    await this.parseJob({
      chapter: {
        id: chapterId,
        title: chapter.title,
        link: chapter.link,
      },
      book,
    });

    return await db().collection('book_chapter_text').findOne({ bookId, chapterId, type: this.getKey() }, { content: 1, title: 1, _id: 0 });
  }

  async syncAllContent({
    bookId,
    bookName,
  }) {
    // 不考虑图书不存在的情况，如果不存在则说明数据同步存在问题
    if (!bookId || !bookName) {
      throw '[IParser] 同步图书所有文章内容缺少bookId或者bookName参数';
    }

    // 获取已缓存章节内容
    let oldChapterTextIds = [];
    try {
      const list = await db().collection('book_chapters_text').find({ bookId, type: this.getConfig().key }, { _id: 1 }).toArray();
      list.forEach((oldChapter) => {
        oldChapterTextIds.push(oldChapter._id);
      });
    } catch (dberr5) {
      if (dberr5) {
        console.error('[IParser] 获取图书内容失败', dberr5);
        return false;
      }
    }

    // 根据章节列表下载章节内容
    // 存储章节内容至数据库
    try {
      chapters
        .filter(chapter => oldChapterTextIds.indexOf(`${chapter.id}_${this.getConfig().key}`) === -1)
        .forEach((chapter) => {
          this[_queue].addData({
            chapter,
            book: {
              bookId: `${bookId}`,
              bookName,
            },
          });
        });
    } catch (dberr3) {
      if (dberr3) {
        console.error('[IParser] 加入任务队列失败', dberr3);
        return false;
      }
    }

    console.log('[IParser] 加入任务队列成功');

    await this[_queue].waitAll();
  }

  /**
   * 上一章节
   */
  prevChapter() { }

  /**
   * 下一章节
   */
  nextChapter() { }

}


export default IParser;
