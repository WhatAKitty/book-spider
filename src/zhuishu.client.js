
/**
 * 追书神器客户端描述文件
 * 
 * 追书API参考：https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md
 * 感谢@zimplexing的文档
 * @date 2018-03-18
 */

import Rest from 'react-rest-kit';
import { config } from './config';

const rest = new Rest({
  contentType: 'application/json',
  dataType: 'json',
});

const processZhuishuResp = (data, filter = (data) => ({ data })) => {
  if ('undefined' !== typeof data.ok && !data.ok) {
    // 追书神器返回错误
    return { err: data.msg };
  }

  return filter(data);
};

const wrapBookInfo = data => {
  return {
    ...data,
    cover: config.v2_urls.statics() + data.cover,
  };
};

const wrapRankInfo = data => {
  return {
    ...data,
    cover: config.v2_urls.statics() + data.cover,
  };
};

const Zhuishu = {
  async recommends(params = {}) {
    const { gender, major, minor, start = 0, limit = 20 } = params;

    return this.catBooks({
      gender,
      type: 'hot',
      major,
      minor,
      start,
      limit,
    });
  },
  async cats() {
    const { data, err } = await rest.GET(config.v2_urls.cats());

    if (err) {
      return { err };
    }

    return processZhuishuResp(data);
  },
  async subCats() {
    const { data, err } = await rest.GET(config.v2_urls.subCats());

    if (err) {
      return { err };
    }

    return processZhuishuResp(data);
  },
  async catBooks(params = {}) {
    const { gender, type, major, minor, start = 0, limit = 20 } = params;
    const optionMinor = minor ? { minor } : {};
    const { data, err } = await rest.GET(config.v2_urls.catBooks(), {
      gender,
      type,
      major,
      start,
      limit,
      minor: minor ? minor : '',
    });

    if (err) {
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.books.map(book => wrapBookInfo(book)) }));
  },
  async ranks() {
    const { data, err } = await rest.GET(config.v2_urls.ranks());

    if (err) {
      return { err };
    }

    return processZhuishuResp(data, data => ({
      data: Object
        .keys(data)
        .reduce((res, key) => {
          const val = data[key];
          if (val instanceof Array) {
            res[key] = val.map(item => wrapRankInfo(item));
          } else {
            res[key] = val;
          }
          return res;
        }, {})
    }));
  },
  async rankBooks(params = {}) {
    const { rankId } = params;
    const { data, err } = await rest.GET(config.v2_urls.rankBooks(rankId));

    if (err) {
      return { err };
    }

    return processZhuishuResp(data, data => ({
      data: {
        ...data,
        ranking: {
          ...data.ranking,
          cover: config.v2_urls.statics() + data.ranking.cover,
          icon: config.v2_urls.statics() + data.ranking.icon,
          books: data.ranking.books.map(book => wrapBookInfo(book)),
        },
      }
    }));
  },
  async authorBooks(params = {}) {
    const { author = '' } = params;
    const { data, err } = await rest.GET(config.v2_urls.authorBooks(author));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.books.map(book => wrapBookInfo(book)) }));
  },
  async searchBooks(params = {}) {
    const { key = '' } = params;
    const { data, err } = await rest.GET(config.v2_urls.search(key));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.books.map(book => wrapBookInfo(book)) }));
  },
  async bookInfo(params = {}) {
    const { bookId } = params;
    const { data, err } = await rest.GET(config.v2_urls.info(bookId));

    if (err) {
      // 返回错误
      return { err };
    }

    const { data: authorBooks, err: booksErr } = await this.authorBooks({ author: data.author });

    if (booksErr) {
      return { err: booksErr };
    }

    return processZhuishuResp(data, data => ({
      data: {
        ...wrapBookInfo(data),
        authorBooks: authorBooks.filter(authorBook => authorBook._id !== data._id),
      }
    }));
  },
  async newestChapter(params = {}) {
    const { bookIds } = params;
    const { data, err } = await rest.GET(config.v2_urls.newestChapter(bookIds));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({
      data: data.reduce((all, book) => {
        all[book._id] = book;
        return all;
      }, {})
    }));
  },
  async chapters(params = {}) {
    const { bookId } = params;
    const { data, err } = await rest.GET(config.v2_urls.chapters(bookId));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.mixToc.chapters }));
  },
  async chaptersBySource(params = {}) {
    const { sourceId } = params;
    const { data, err } = await rest.GET(config.v2_urls.chaptersBySource(sourceId));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.chapters }));
  },
  async content(params = {}) {
    const { link } = params;
    const { data, err } = await rest.GET(config.v2_urls.content(link));

    if (err) {
      // 返回错误
      return { err };
    }

    return processZhuishuResp(data, data => ({ data: data.chapter }));
  },
  async comments(params = {}) {
    return { err: '暂时不支持' };
  },
};

export default Zhuishu;
