'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
 * @swagger
 * definitions:
 *   BAD404:
 *     type: object
 *     properties:
 *       msg:
 *         type: object
 *   Book:
 *     type: object
 *     properties:
 *       BookId:
 *         type: number
 *       BookName:
 *         type: string
 *       AuthorId:
 *         type: number
 *       AuthorName:
 *         type: string
 *       Author:
 *         type: string
 *       CategoryId:
 *         type: number
 *       CategoryName:
 *         type: string
 *       ImageStatus:
 *         type: number
 *       LastUpdateChapterID:
 *         type: number
 *       LastUpdateChapterName:
 *         type: string
 *       LastChapterUpdateTime:
 *         type: number
 *       LastVipUpdateChapterId:
 *         type: number
 *       LastVipUpdateChapterName:
 *         type: string
 *       LastVipChapterUpdateTime:
 *         type: number
 *       IsVip:
 *         type: number
 *       BookStatus:
 *         type: number
 *       WordsCount:
 *         type: number
 *       Label:
 *         type: string
 *       IsQin:
 *         type: number
 *       BssReadTotal:
 *         type: number
 *       BssRecomTotal:
 *         type: number
 *       Price:
 *         type: number
 *       NewPrice:
 *         type: number
 *       Recommendation:
 *         type: string
 *       RecommenId:
 *         type: number
 *       GroupName:
 *         type: string
 *       ReadingType:
 *         type: number
 *       AlgInfo:
 *         type: string
 *       PartCount:
 *         type: number
 *       SourceBookId:
 *         type: number
 *       BookPartInfo:
 *         type: string
 *       ChargeType:
 *         type: number
 *       TotalPrice:
 *         type: number
 *       Description:
 *         type: string
 *   GroupItem:
 *     type: object
 *     properties:
 *       Title:
 *         type: string
 *       Subtitle:
 *         type: string
 *       ActionUrl:
 *         type: string
 *       Direction:
 *         type: string
 *       UpdateDesc:
 *         type: string
 *       Data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Book'
 *   Cover:
 *     type: object
 *     properties:
 *       Pic:
 *         type: string
 *       ActionUrl:
 *         type: string
 *   Recommends:
 *     type: object
 *     properties:
 *       CoverList:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Cover'
 *       Group:
 *         type: array
 *         items:
 *           $ref: '#/definitions/GroupItem'
 *   Chapter:
 *     type: object
 *     properties:
 *       c:
 *         type: number
 *       n:
 *         type: string
 *       ov:
 *         type: number
 *       p:
 *         type: number
 *       t:
 *         type: number
 *       w:
 *         type: number
 *       vc:
 *         type: string
 *       ui:
 *         type: number
 *       ccs:
 *         type: number
 *       cci:
 *         type: number
 *   ChapterResp:
 *     type: object
 *     properties:
 *       BookId:
 *         type: number
 *       BookName:
 *         type: string
 *       AuthorId:
 *         type: number
 *       AuthorName:
 *         type: string
 *       Author:
 *         type: string
 *       CategoryId:
 *         type: number
 *       CategoryName:
 *         type: string
 *       ImageStatus:
 *         type: number
 *       LastUpdateChapterID:
 *         type: number
 *       LastUpdateChapterName:
 *         type: string
 *       LastChapterUpdateTime:
 *         type: number
 *       LastVipUpdateChapterId:
 *         type: number
 *       LastVipUpdateChapterName:
 *         type: string
 *       LastVipChapterUpdateTime:
 *         type: number
 *       IsVip:
 *         type: number
 *       BookStatus:
 *         type: number
 *       WordsCount:
 *         type: number
 *       Label:
 *         type: string
 *       IsQin:
 *         type: number
 *       Chapters:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Chapter'
 *       IsReload:
 *         type: number
 *       DeletedChapters:
 *         type: string
 *       Volumes:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             VolumeCode:
 *               type: string
 *             VolumeName:
 *               type: string
 *       EnableBookUnitLease:
 *         type: number
 *       EnableBookUnitBuy:
 *         type: number
 *       Units:
 *         type: string
 *       WholeSale:
 *         type: number
 *       TotalPrice:
 *         type: number
 *   Comment:
 *     type: object
 *     properties:
 *       RankName:
 *         type: string 
 *       Id:
 *         type: number
 *       ViewCount:
 *         type: number
 *       PostCount:
 *         type: number
 *       Subject:
 *         type: string
 *       UserName:
 *         type: string
 *       UserId:
 *         type: number
 *       PostDate:
 *         type: long
 *       Body:
 *         type: string
 *       Type:
 *         type: number
 *       VoteYes:
 *         type: number
 *       VoteAgainst:
 *         type: number
 *       UserHeadIcon:
 *         type: string
 *       From:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/books/recommends:
 *   get:
 *     description: 推荐书籍
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取书籍推荐
 *         schema:
 *           $ref: '#/definitions/Recommends'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 *         
 */
BookApi.get('/recommends', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var _ref2, data, err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _qidian2.default.recommends(ctx.query);

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
 * @swagger
 * /api/v1/books:
 *   get:
 *     description: 图书查询
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: 关键字
 *         in: query
 *         required: false
 *         type: string
 *       - name: channel
 *         description: 图书来源渠道
 *         in: query
 *         required: false
 *         type: integer
 *       - name: firstEntry
 *         description: 图书来源渠道
 *         in: query
 *         required: false
 *         type: integer
 *       - name: order
 *         description: 查询排序
 *         in: query
 *         required: false
 *         type: integer
 *       - name: pageIndex
 *         description: 查询开始页索引
 *         in: query
 *         required: false
 *         type: integer
 *       - name: size
 *         description: 图书字数
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功搜索到书籍
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 *         
 */
BookApi.get('/', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
    var _ref4, data, err;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _qidian2.default.searchBooks(ctx.query);

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
            ctx.body = data || [];

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
 * @swagger
 * /api/v1/books/{bookId}:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 图书详情接口
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: iosDeviceType
 *         description: 是否IOS设备
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取书籍详情
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'      
 */
BookApi.get('/:bookId', function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
    var _ref6, data, err;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _qidian2.default.bookInfo({
              bookId: ctx.params.bookId,
              iosDeviceType: ctx.query.iosDeviceType
            });

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
 * @swagger
 * /api/v1/books/{bookId}/chapters/newest:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 最新图书章节列表
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: iosDeviceType
 *         description: 是否IOS设备
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取书籍详情
 *         schema:
 *           $ref: '#/definitions/ChapterResp'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:bookId/chapters/newest', function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
    var _ref8, data, err;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _qidian2.default.chapters({
              bookId: ctx.params.bookId,
              pageIndex: ctx.query.pageIndex
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
 * @swagger
 * /api/v1/books/{source}/{bookId}/chapters:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: string
 *       enum:
 *         - qbg
 *         - ybdu
 *       x-example: qbg
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 源站图书章节列表
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取图书章节列表
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               chapterId:
 *                 type: string
 *               title:
 *                 type: stirng
 *       400:
 *         description: 无法获取图书章节列表
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:source/:bookId/chapters', function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
    var chapters;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _parser2.default)(ctx.params.source).findChapters({ bookId: ctx.params.bookId });

          case 3:
            chapters = _context5.sent;


            ctx.status = 200;
            ctx.body = chapters.map(function (chapter) {
              return {
                chapterId: chapter.chapterId,
                title: chapter.title
              };
            });
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);

            ctx.status = 400;
            ctx.body = {
              msg: _context5.t0
            };

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}());

/**
 * @swagger
 * /api/v1/books/{source}/{bookId}/{chapterId}:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: string
 *       enum:
 *         - qbg
 *         - ybdu
 *       x-example: qbg
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *     - name: chapterId
 *       description: 章节编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 112
 *   get:
 *     description: 源站章节内容
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取图书章节内容
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *             title:
 *               type: string
 *       400:
 *         description: 无法获取图书章节内容
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:source/:bookId/:chapterId', function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {
    var chapter;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _parser2.default)(ctx.params.source).syncContent({ bookId: ctx.params.bookId, chapterId: ctx.params.chapterId });

          case 3:
            chapter = _context6.sent;


            ctx.status = 200;
            ctx.body = (0, _extends3.default)({}, chapter);
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
    return _ref10.apply(this, arguments);
  };
}());

/**
 * @swagger
 * /api/v1/books/{bookId}/comments:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 图书书评列表
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageIndex
 *         description: 开始索引
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取图书书评
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Comment'
 *       400:
 *         description: 无法获取图书书评
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:bookId/comments', function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {
    var _ref12, data, err;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _qidian2.default.comments({
              bookId: ctx.params.bookId,
              pageIndex: ctx.query.pageIndex
            });

          case 2:
            _ref12 = _context7.sent;
            data = _ref12.data;
            err = _ref12.err;

            if (!err) {
              _context7.next = 9;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              msg: err
            };
            return _context7.abrupt('return');

          case 9:

            ctx.status = 200;
            ctx.body = data;

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref11.apply(this, arguments);
  };
}());

// /**
//  * 开启解析
//  */
// BookApi.get('/:source/:bookId/sync', async (ctx, next) => {
//   const result = await parserFactory(ctx.params.source).start({ bookId: ctx.params.bookId });

//   if (!result) {
//     ctx.status = 400;
//     ctx.body = {
//       msg: `同步书本${ctx.params.bookId}失败`,
//     };
//     return;
//   }

//   ctx.status = 200;
//   ctx.body = {
//     msg: `同步书本${ctx.params.bookId}成功`,
//   };
// });

exports.default = BookApi;
//# sourceMappingURL=book.api.js.map