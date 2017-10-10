
import CommonParser from './common.parser';
import cheerio from 'cheerio';

import config from '../../config/source.js/www.biquge5200.com.source';

class BQGParser extends CommonParser {

  constructor() {
    super({
      config,
    });
  }

  /**
   * 根据图书名搜索图书
   * 
   * @param {*} bookName 
   */
  async searchBookByName(bookName) {
    const searchHtml = await super.obainHtml(super.getConfig().urls.searchBook, {
      searchkey: bookName,
    });

    return searchHtml;
  }

}

export default BQGParser;
