
import IParser from './IParser';
import cheerio from 'cheerio';

class CommonParser extends IParser {

  constructor({
    config,
  }) {
    super({
      config,
    });

    this.searchBookByName = this.searchBookByName.bind(this);
  }

  /**
   * 搜索图书信息
   */
  async searchBook(bookName) {
    const searchHtml = await this.searchBookByName(bookName);

    if (searchHtml == null) {
      return null;
    }

    let $ = cheerio.load(searchHtml);
    const resultList = $(super.getConfig().eles.search).toArray();

    if (resultList.length === 0) {
      // 未搜索到该书
      return null;
    }

    const resultEle = resultList[0];
    let $title = $(resultEle).find(super.getConfig().eles.title);
    const name = $title.text().trim();
    const link = $title.attr('href');
    if (name != bookName.trim()) {
      // 找到的书不符合
      return null;
    }

    return {
      name,
      link,
    };
  }

  /**
   * 搜索章节
   */
  async searchChapters(link) {
    const chaptersHtml = await super.obainHtml(link);

    if (chaptersHtml == null) {
      return null;
    }

    let $ = cheerio.load(chaptersHtml);
    const resultList = $(super.getConfig().eles.chapter).toArray();
    if (resultList.length === 0) {
      // 无章节
      return null;
    }

    const chapters = resultList.map(item => {
      const $chapter = $(item);
      const href = $chapter.attr('href');
      return {
        id: href.replace(link, '').replace(/\//g, '').replace(/\.html/g, ''),
        title: $chapter.text(),
        link: $chapter.attr('href'),
      };
    });

    if (chapters.length === 0) {
      // 无章节
      return null;
    }

    return chapters;
  }

  /**
   * 解析HTML章节内容
   */
  async parseContent(link) {
    const contentHtml = await super.obainHtml(link);

    if (contentHtml == null) {
      return null;
    }

    let $ = cheerio.load(contentHtml);
    let $content = $(super.getConfig().eles.content);

    $content.find('br').replaceWith('\r\n');
    const chapterContent = $content.text();
    if (!chapterContent || !chapterContent.length) {
      // 无内容
      return null;
    }

    return chapterContent;
  }

  /**
   * 上一章节
   */
  prevChapter() { }

  /**
   * 下一章节
   */
  nextChapter() { }

  /**
   * 根据图书名搜索图书
   * 
   * @param {*} bookName 
   */
  async searchBookByName(bookName) {};

}

export default CommonParser;
