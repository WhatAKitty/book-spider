'use strict';Object.defineProperty(exports, "__esModule", { value: true });var proxyHost = 'https://mage.if.qidian.com/Atom.axd/Api';
var zhuishuHost = {
  main: 'http://api.zhuishushenqi.com',
  second: 'http://api05iye5.zhuishushenqi.com',
  chapter: 'http://chapterup.zhuishushenqi.com/chapter',
  statics: 'https://statics.zhuishushenqi.com' };exports.default =


{
  urls: {
    recommend: proxyHost + '/BookStore/GetBookStoreList',
    search: proxyHost + '/Search/GetBookStoreWithBookList',
    info: proxyHost + '/Book/Get',
    chapters: proxyHost + '/Book/GetChapterList',
    comments: proxyHost + '/Review/Get' },

  v2_urls: {
    cats: function cats() {return zhuishuHost.main + '/cats/lv2/statistics';},
    subCats: function subCats() {return zhuishuHost.main + '/cats/lv2';},
    catBooks: function catBooks() {return zhuishuHost.main + '/book/by-categories';},
    ranks: function ranks() {return zhuishuHost.main + '/ranking/gender';},
    rankBooks: function rankBooks(rankId) {return zhuishuHost.main + '/ranking/' + rankId;},
    authorBooks: function authorBooks(author) {return zhuishuHost.main + '/book/accurate-search?author=' + encodeURI(author) + '&packageName=com.ifmoc.ZhuiShuShenQi';},
    search: function search(query) {return zhuishuHost.main + '/book/fuzzy-search?query=' + encodeURI(query);},
    info: function info(bookId) {return zhuishuHost.main + '/book/' + bookId;},
    sources: function sources(bookId) {return zhuishuHost.main + '/atoc?view=summary&book=' + bookId;},
    newestChapter: function newestChapter() {var bookIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return zhuishuHost.second + '/book?view=updated&id=' + bookIds.join(',');},
    chapters: function chapters(bookId) {return zhuishuHost.main + '/mix-atoc/' + bookId + '?view=chapters';},
    chaptersBySource: function chaptersBySource(sourceId) {return zhuishuHost.main + '/atoc/' + sourceId + '?view=chapters';},
    content: function content(link) {return zhuishuHost.chapter + '/' + link;},
    statics: function statics() {return '' + zhuishuHost.statics;} } };
//# sourceMappingURL=config.js.map