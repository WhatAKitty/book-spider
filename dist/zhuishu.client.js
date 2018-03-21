'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);








var _reactRestKit = require('react-rest-kit');var _reactRestKit2 = _interopRequireDefault(_reactRestKit);
var _config = require('./config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                 * 追书神器客户端描述文件
                                                                                                                                 * 
                                                                                                                                 * 追书API参考：https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md
                                                                                                                                 * 感谢@zimplexing的文档
                                                                                                                                 * @date 2018-03-18
                                                                                                                                 */var rest = new _reactRestKit2.default({ contentType: 'application/json', dataType: 'json' });
var processZhuishuResp = function processZhuishuResp(data) {var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (data) {return { data: data };};
  if ('undefined' !== typeof data.ok && !data.ok) {
    // 追书神器返回错误
    return { err: data.msg };
  }

  return filter(data);
};

var wrapBookInfo = function wrapBookInfo(data) {
  return (0, _extends3.default)({},
  data, {
    cover: _config.config.v2_urls.statics() + data.cover });

};

var wrapRankInfo = function wrapRankInfo(data) {
  return (0, _extends3.default)({},
  data, {
    cover: _config.config.v2_urls.statics() + data.cover });

};

var Zhuishu = {
  recommends: function recommends() {var _this = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {var gender, major, minor, _params$start, start, _params$limit, limit;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              gender = params.gender, major = params.major, minor = params.minor, _params$start = params.start, start = _params$start === undefined ? 0 : _params$start, _params$limit = params.limit, limit = _params$limit === undefined ? 20 : _params$limit;return _context.abrupt('return',

              _this.catBooks({
                gender: gender,
                type: 'hot',
                major: major,
                minor: minor,
                start: start,
                limit: limit }));case 2:case 'end':return _context.stop();}}}, _callee, _this);}))();

  },
  cats: function cats() {var _this2 = this;return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {var _ref, data, err;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                rest.GET(_config.config.v2_urls.cats()));case 2:_ref = _context2.sent;data = _ref.data;err = _ref.err;if (!

              err) {_context2.next = 7;break;}return _context2.abrupt('return',
              { err: err });case 7:return _context2.abrupt('return',


              processZhuishuResp(data));case 8:case 'end':return _context2.stop();}}}, _callee2, _this2);}))();
  },
  subCats: function subCats() {var _this3 = this;return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {var _ref2, data, err;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                rest.GET(_config.config.v2_urls.subCats()));case 2:_ref2 = _context3.sent;data = _ref2.data;err = _ref2.err;if (!

              err) {_context3.next = 7;break;}return _context3.abrupt('return',
              { err: err });case 7:return _context3.abrupt('return',


              processZhuishuResp(data));case 8:case 'end':return _context3.stop();}}}, _callee3, _this3);}))();
  },
  catBooks: function catBooks() {var _this4 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {var gender, type, major, minor, _params$start2, start, _params$limit2, limit, optionMinor, _ref3, data, err;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              gender = params.gender, type = params.type, major = params.major, minor = params.minor, _params$start2 = params.start, start = _params$start2 === undefined ? 0 : _params$start2, _params$limit2 = params.limit, limit = _params$limit2 === undefined ? 20 : _params$limit2;
              optionMinor = minor ? { minor: minor } : {};_context4.next = 4;return (
                rest.GET(_config.config.v2_urls.catBooks(), {
                  gender: gender,
                  type: type,
                  major: major,
                  start: start,
                  limit: limit,
                  minor: minor ? minor : '' }));case 4:_ref3 = _context4.sent;data = _ref3.data;err = _ref3.err;if (!


              err) {_context4.next = 9;break;}return _context4.abrupt('return',
              { err: err });case 9:return _context4.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.books.map(function (book) {return wrapBookInfo(book);}) };}));case 10:case 'end':return _context4.stop();}}}, _callee4, _this4);}))();
  },
  ranks: function ranks() {var _this5 = this;return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {var _ref4, data, err;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                rest.GET(_config.config.v2_urls.ranks()));case 2:_ref4 = _context5.sent;data = _ref4.data;err = _ref4.err;if (!

              err) {_context5.next = 7;break;}return _context5.abrupt('return',
              { err: err });case 7:return _context5.abrupt('return',


              processZhuishuResp(data, function (data) {return {
                  data: Object.
                  keys(data).
                  reduce(function (res, key) {
                    var val = data[key];
                    if (val instanceof Array) {
                      res[key] = val.map(function (item) {return wrapRankInfo(item);});
                    } else {
                      res[key] = val;
                    }
                    return res;
                  }, {}) };}));case 8:case 'end':return _context5.stop();}}}, _callee5, _this5);}))();

  },
  rankBooks: function rankBooks() {var _this6 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {var rankId, _ref5, data, err;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
              rankId = params.rankId;_context6.next = 3;return (
                rest.GET(_config.config.v2_urls.rankBooks(rankId)));case 3:_ref5 = _context6.sent;data = _ref5.data;err = _ref5.err;if (!

              err) {_context6.next = 8;break;}return _context6.abrupt('return',
              { err: err });case 8:return _context6.abrupt('return',


              processZhuishuResp(data, function (data) {return {
                  data: (0, _extends3.default)({},
                  data, {
                    ranking: (0, _extends3.default)({},
                    data.ranking, {
                      cover: _config.config.v2_urls.statics() + data.ranking.cover,
                      icon: _config.config.v2_urls.statics() + data.ranking.icon,
                      books: data.ranking.books.map(function (book) {return wrapBookInfo(book);}) }) }) };}));case 9:case 'end':return _context6.stop();}}}, _callee6, _this6);}))();



  },
  authorBooks: function authorBooks() {var _this7 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {var _params$author, author, _ref6, data, err;return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_params$author =
              params.author, author = _params$author === undefined ? '' : _params$author;_context7.next = 3;return (
                rest.GET(_config.config.v2_urls.authorBooks(author)));case 3:_ref6 = _context7.sent;data = _ref6.data;err = _ref6.err;if (!

              err) {_context7.next = 8;break;}return _context7.abrupt('return',

              { err: err });case 8:return _context7.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.books.map(function (book) {return wrapBookInfo(book);}) };}));case 9:case 'end':return _context7.stop();}}}, _callee7, _this7);}))();
  },
  searchBooks: function searchBooks() {var _this8 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {var _params$key, key, _ref7, data, err;return _regenerator2.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_params$key =
              params.key, key = _params$key === undefined ? '' : _params$key;_context8.next = 3;return (
                rest.GET(_config.config.v2_urls.search(key)));case 3:_ref7 = _context8.sent;data = _ref7.data;err = _ref7.err;if (!

              err) {_context8.next = 8;break;}return _context8.abrupt('return',

              { err: err });case 8:return _context8.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.books.map(function (book) {return wrapBookInfo(book);}) };}));case 9:case 'end':return _context8.stop();}}}, _callee8, _this8);}))();
  },
  bookInfo: function bookInfo() {var _this9 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {var bookId, _ref8, data, err, _ref9, authorBooks, booksErr;return _regenerator2.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
              bookId = params.bookId;_context9.next = 3;return (
                rest.GET(_config.config.v2_urls.info(bookId)));case 3:_ref8 = _context9.sent;data = _ref8.data;err = _ref8.err;if (!

              err) {_context9.next = 8;break;}return _context9.abrupt('return',

              { err: err });case 8:_context9.next = 10;return (


                _this9.authorBooks({ author: data.author }));case 10:_ref9 = _context9.sent;authorBooks = _ref9.data;booksErr = _ref9.err;if (!

              booksErr) {_context9.next = 15;break;}return _context9.abrupt('return',
              { err: booksErr });case 15:return _context9.abrupt('return',


              processZhuishuResp(data, function (data) {return {
                  data: (0, _extends3.default)({},
                  wrapBookInfo(data), {
                    authorBooks: authorBooks.filter(function (authorBook) {return authorBook._id !== data._id;}) }) };}));case 16:case 'end':return _context9.stop();}}}, _callee9, _this9);}))();


  },
  newestChapter: function newestChapter() {var _this10 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {var bookIds, _ref10, data, err;return _regenerator2.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
              bookIds = params.bookIds;_context10.next = 3;return (
                rest.GET(_config.config.v2_urls.newestChapter(bookIds)));case 3:_ref10 = _context10.sent;data = _ref10.data;err = _ref10.err;if (!

              err) {_context10.next = 8;break;}return _context10.abrupt('return',

              { err: err });case 8:return _context10.abrupt('return',


              processZhuishuResp(data, function (data) {return {
                  data: data.reduce(function (all, book) {
                    all[book._id] = book;
                    return all;
                  }, {}) };}));case 9:case 'end':return _context10.stop();}}}, _callee10, _this10);}))();

  },
  chapters: function chapters() {var _this11 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {var bookId, _ref11, data, err;return _regenerator2.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:
              bookId = params.bookId;_context11.next = 3;return (
                rest.GET(_config.config.v2_urls.chapters(bookId)));case 3:_ref11 = _context11.sent;data = _ref11.data;err = _ref11.err;if (!

              err) {_context11.next = 8;break;}return _context11.abrupt('return',

              { err: err });case 8:return _context11.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.mixToc.chapters };}));case 9:case 'end':return _context11.stop();}}}, _callee11, _this11);}))();
  },
  chaptersBySource: function chaptersBySource() {var _this12 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {var sourceId, _ref12, data, err;return _regenerator2.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:
              sourceId = params.sourceId;_context12.next = 3;return (
                rest.GET(_config.config.v2_urls.chaptersBySource(sourceId)));case 3:_ref12 = _context12.sent;data = _ref12.data;err = _ref12.err;if (!

              err) {_context12.next = 8;break;}return _context12.abrupt('return',

              { err: err });case 8:return _context12.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.chapters };}));case 9:case 'end':return _context12.stop();}}}, _callee12, _this12);}))();
  },
  content: function content() {var _this13 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {var link, _ref13, data, err;return _regenerator2.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:
              link = params.link;_context13.next = 3;return (
                rest.GET(_config.config.v2_urls.content(link)));case 3:_ref13 = _context13.sent;data = _ref13.data;err = _ref13.err;if (!

              err) {_context13.next = 8;break;}return _context13.abrupt('return',

              { err: err });case 8:return _context13.abrupt('return',


              processZhuishuResp(data, function (data) {return { data: data.chapter };}));case 9:case 'end':return _context13.stop();}}}, _callee13, _this13);}))();
  },
  comments: function comments() {var _this14 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {return _regenerator2.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:return _context14.abrupt('return',
              { err: '暂时不支持' });case 1:case 'end':return _context14.stop();}}}, _callee14, _this14);}))();
  } };exports.default =


Zhuishu;
//# sourceMappingURL=zhuishu.client.js.map