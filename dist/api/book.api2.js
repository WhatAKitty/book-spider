'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _zhuishu = require('../zhuishu.client');var _zhuishu2 = _interopRequireDefault(_zhuishu);
var _parser = require('../core/parser');var _parser2 = _interopRequireDefault(_parser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var BookApi = new _koaRouter2.default({
  prefix: '/api/v2/books' });


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
                               *       _id:
                               *         type: string
                               *       title:
                               *         type: string
                               *       author:
                               *         type: string
                               *       longIntro:
                               *         type: string
                               *       conver:
                               *         type: string
                               *       creater:
                               *         type: number
                               *       majorCate:
                               *         type: string
                               *       minorCate:
                               *         type: string
                               *       rating:
                               *         type: object
                               *         properties:
                               *           count:
                               *             type: number,
                               *           score:
                               *             type: number,
                               *           isEffect:
                               *             type: boolean,
                               *       hasCopyright:
                               *         type: boolean
                               *       updated:
                               *         type: string
                               *       chaptersCount:
                               *         type: number
                               *       lastChapter:
                               *         type: string
                               *       gender:
                               *         type: array
                               *       tags:
                               *         type: array
                               *       cat:
                               *         type: string
                               *   Recommends:
                               *     type: array
                               *     items:
                               *       $ref: '#/definitions/Book'
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
                                   * /api/v2/books/recommends:
                                   *   get:
                                   *     description: 推荐书籍
                                   *     produces:
                                   *       - application/json
                                   *     parameters:
                                   *       - name: gender
                                   *         description: 分类（'male', 'female', 'press'）
                                   *         in: query
                                   *         required: true
                                   *         type: string
                                   *       - name: start
                                   *         description: 开始索引
                                   *         in: query
                                   *         required: false
                                   *         type: integer
                                   *       - name: limit
                                   *         description: 总查询条数
                                   *         in: query
                                   *         required: false
                                   *         type: integer
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
BookApi.get('/recommends', function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var _ref2, data, err;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              _zhuishu2.default.recommends(ctx.query));case 2:_ref2 = _context.sent;data = _ref2.data;err = _ref2.err;if (!

            err) {_context.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


/**
                                                                                                                                                                          * @swagger
                                                                                                                                                                          * /api/v2/books:
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
BookApi.get('/', function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {var _ref4, data, err;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              _zhuishu2.default.searchBooks(ctx.query));case 2:_ref4 = _context2.sent;data = _ref4.data;err = _ref4.err;if (!

            err) {_context2.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context2.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data || [];case 11:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x3, _x4) {return _ref3.apply(this, arguments);};}());


/**
                                                                                                                                                                                    * @swagger
                                                                                                                                                                                    * /api/v2/books/{bookId}:
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
BookApi.get('/:bookId', function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {var _ref6, data, err;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              _zhuishu2.default.bookInfo({
                bookId: ctx.params.bookId }));case 2:_ref6 = _context3.sent;data = _ref6.data;err = _ref6.err;if (!


            err) {_context3.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context3.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function (_x5, _x6) {return _ref5.apply(this, arguments);};}());


/**
                                                                                                                                                                              * @swagger
                                                                                                                                                                              * /api/v2/books/{bookId}/chapters/newest:
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
BookApi.get('/:bookId/chapters/newest', function () {var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {var _ref8, data, err;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (

              _zhuishu2.default.newestChapter({
                bookIds: [ctx.params.bookId] }));case 2:_ref8 = _context4.sent;data = _ref8.data;err = _ref8.err;if (!


            err) {_context4.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context4.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data[ctx.params.bookId];case 11:case 'end':return _context4.stop();}}}, _callee4, undefined);}));return function (_x7, _x8) {return _ref7.apply(this, arguments);};}());


/**
                                                                                                                                                                                                 * @swagger
                                                                                                                                                                                                 * /api/v2/books/{bookId}/chapters:
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
BookApi.get('/:bookId/chapters', function () {var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {var _ref10, data, err;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              _zhuishu2.default.chapters({
                bookId: ctx.params.bookId }));case 2:_ref10 = _context5.sent;data = _ref10.data;err = _ref10.err;if (!


            err) {_context5.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context5.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context5.stop();}}}, _callee5, undefined);}));return function (_x9, _x10) {return _ref9.apply(this, arguments);};}());


/**
                                                                                                                                                                               * @swagger
                                                                                                                                                                               * /api/v2/books/{sourceId}/chapters:
                                                                                                                                                                               *   get:
                                                                                                                                                                               *     description: 某个小说源的章节内容
                                                                                                                                                                               *     produces:
                                                                                                                                                                               *       - application/json
                                                                                                                                                                               */
BookApi.get('/:sourceId/chapters', function () {var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {var _ref12, data, err;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              _zhuishu2.default.chaptersBySource({
                sourceId: ctx.params.sourceId }));case 2:_ref12 = _context6.sent;data = _ref12.data;err = _ref12.err;if (!


            err) {_context6.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context6.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context6.stop();}}}, _callee6, undefined);}));return function (_x11, _x12) {return _ref11.apply(this, arguments);};}());


/**
                                                                                                                                                                                 * @swagger
                                                                                                                                                                                 * /api/v2/books/chapter/{link}:
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
BookApi.get('/chapter/:link', function () {var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {var _ref14, data, err;return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
              _zhuishu2.default.content({
                link: ctx.params.link }));case 2:_ref14 = _context7.sent;data = _ref14.data;err = _ref14.err;if (!


            err) {_context7.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context7.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context7.stop();}}}, _callee7, undefined);}));return function (_x13, _x14) {return _ref13.apply(this, arguments);};}());


/**
                                                                                                                                                                                 * @swagger
                                                                                                                                                                                 * /api/v2/books/{bookId}/comments:
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
BookApi.get('/:bookId/comments', function () {var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx, next) {var _ref16, data, err;return _regenerator2.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
              _zhuishu2.default.comments({
                bookId: ctx.params.bookId,
                pageIndex: ctx.query.pageIndex }));case 2:_ref16 = _context8.sent;data = _ref16.data;err = _ref16.err;if (!


            err) {_context8.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context8.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context8.stop();}}}, _callee8, undefined);}));return function (_x15, _x16) {return _ref15.apply(this, arguments);};}());exports.default =


BookApi;
//# sourceMappingURL=book.api2.js.map