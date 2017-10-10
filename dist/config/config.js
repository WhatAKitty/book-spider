'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var proxyHost = 'https://mage.if.qidian.com/Atom.axd/Api';

exports.default = {
  urls: {
    recommend: proxyHost + '/BookStore/GetBookStoreList',
    search: proxyHost + '/Search/GetBookStoreWithBookList',
    info: proxyHost + '/Book/Get',
    chapters: proxyHost + '/Book/GetChapterList',
    comments: proxyHost + '/Review/Get'
  }
};
//# sourceMappingURL=config.js.map