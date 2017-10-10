
import CommonParser from './common.parser';
import cheerio from 'cheerio';

import config from '../../config/source.js/www.ybdu.com.source';

class YBDUParser extends CommonParser {

  constructor() {
    super({
      config,
    });

    // this.searchPage = this.searchPage.bind(this);
  }

  /**
   * 根据图书名搜索图书
   * 
   * @param {*} bookName 
   */
  async searchBookByName(bookName) {
    const searchHtml = await super.obainHtml(super.getConfig().urls.searchBook, {
      q: bookName,
      s: 6637491585052650179,
      nsid: 0,
    });

    return searchHtml;
  }

}

export default YBDUParser;
