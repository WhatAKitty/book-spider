'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _qidian = require('../qidian.client');

var _qidian2 = _interopRequireDefault(_qidian);

var _parser = require('../core/parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookApi = new _koaRouter2.default({
  prefix: '/books'
});

/**
 * 推荐书籍
 */
BookApi.get('/recommend', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var _ref2, data, err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _qidian2.default.recommends();

          case 2:
            _ref2 = _context.sent;
            data = _ref2.data;
            err = _ref2.err;

            if (!err) {
              _context.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * 图书推荐接口
 */
BookApi.get('/recommends', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
    var _ref4, data, err;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _qidian2.default.recommends(ctx.query);

          case 2:
            _ref4 = _context2.sent;
            data = _ref4.data;
            err = _ref4.err;

            if (!err) {
              _context2.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context2.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * 图书查询接口
 */
BookApi.get('/', function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
    var _ref6, data, err;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _qidian2.default.searchBooks(ctx.query);

          case 2:
            _ref6 = _context3.sent;
            data = _ref6.data;
            err = _ref6.err;

            if (!err) {
              _context3.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context3.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * 图书详情接口
 */
BookApi.get('/:bookId', function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
    var _ref8, data, err;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _qidian2.default.bookInfo({
              bookId: ctx.params.bookId,
              iosDeviceType: ctx.query.iosDeviceType
            });

          case 2:
            _ref8 = _context4.sent;
            data = _ref8.data;
            err = _ref8.err;

            if (!err) {
              _context4.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context4.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * 图书的章节列表
 */
BookApi.get('/:bookId/chapters/newest', function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
    var _ref10, data, err;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _qidian2.default.chapters({
              bookId: ctx.params.bookId,
              pageIndex: ctx.query.pageIndex
            });

          case 2:
            _ref10 = _context5.sent;
            data = _ref10.data;
            err = _ref10.err;

            if (!err) {
              _context5.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context5.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}());

/**
 * 图书的章节列表
 */
BookApi.get('/:source/:bookId/chapters', function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {
    var chapters;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _parser2.default)(ctx.params.source).findChapters({ bookId: ctx.params.bookId });

          case 3:
            chapters = _context6.sent;


            ctx.status = 200;
            ctx.body = chapters.map(function (chapter) {
              return {
                chapterId: chapter.chapterId,
                title: chapter.title
              };
            });
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            ctx.status = 400;
            ctx.body = {
              msg: _context6.t0
            };

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 8]]);
  }));

  return function (_x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}());

/**
 * 图书的章节内容
 */
BookApi.get('/:source/:bookId/:chapterId', function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {
    var chapter;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _parser2.default)(ctx.params.source).syncContent({ chapterId: ctx.params.chapterId });

          case 3:
            chapter = _context7.sent;


            ctx.status = 200;
            ctx.body = {
              content: chapter.content
            };
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](0);

            ctx.status = 400;
            ctx.body = {
              msg: _context7.t0
            };

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 8]]);
  }));

  return function (_x13, _x14) {
    return _ref12.apply(this, arguments);
  };
}());

/**
 * 图书的书评
 */
BookApi.get('/:bookId/comments', function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx, next) {
    var _ref14, data, err;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _qidian2.default.comments({
              bookId: ctx.params.bookId,
              pageIndex: ctx.query.pageIndex
            });

          case 2:
            _ref14 = _context8.sent;
            data = _ref14.data;
            err = _ref14.err;

            if (!err) {
              _context8.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context8.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16) {
    return _ref13.apply(this, arguments);
  };
}());

/**
 * 开启解析
 */
BookApi.get('/:source/:bookId/sync', function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(ctx, next) {
    var result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _parser2.default)(ctx.params.source).start({ bookId: ctx.params.bookId });

          case 2:
            result = _context9.sent;

            if (result) {
              _context9.next = 7;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: '\u540C\u6B65\u4E66\u672C' + ctx.params.bookId + '\u5931\u8D25'
            };
            return _context9.abrupt('return');

          case 7:

            ctx.status = 200;
            ctx.body = {
              msg: '\u540C\u6B65\u4E66\u672C' + ctx.params.bookId + '\u6210\u529F'
            };

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x17, _x18) {
    return _ref15.apply(this, arguments);
  };
}());

exports.default = BookApi;
//# sourceMappingURL=book.api.js.map