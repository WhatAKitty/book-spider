'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _zhuishu = require('../zhuishu.client');var _zhuishu2 = _interopRequireDefault(_zhuishu);
var _qidian = require('../qidian.client');var _qidian2 = _interopRequireDefault(_qidian);
var _parser = require('../core/parser');var _parser2 = _interopRequireDefault(_parser);
var _cheerio = require('cheerio');var _cheerio2 = _interopRequireDefault(_cheerio);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
var cachedRecommends = {};
BookApi.get('/recommends', function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {var date, key, _ref2, data, err, covers, groups, result;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            date = new Date();
            key = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();if (!
            cachedRecommends[key]) {_context4.next = 6;break;}
            ctx.status = 200;
            ctx.body = cachedRecommends[key];return _context4.abrupt('return');case 6:_context4.next = 8;return (



              _qidian2.default.recommends());case 8:_ref2 = _context4.sent;data = _ref2.data;err = _ref2.err;if (!

            err) {_context4.next = 15;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context4.abrupt('return');case 15:_context4.next = 17;return (





              Promise.all(data.CoverList.map(function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(raw) {var qidianBookId, _ref4, qidianBookHtml, qidianErr, htmlStart, htmlEnd, $, bookName, _ref5, zhuishuBooks, zhuishuErr;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                          qidianBookId = raw.ActionUrl.substring('QDReader://ShowBook/'.length, raw.ActionUrl.length);_context.next = 3;return (
                            _qidian2.default.bookInfoHtml({ bookId: qidianBookId }));case 3:_ref4 = _context.sent;qidianBookHtml = _ref4.data;qidianErr = _ref4.err;if (!
                          qidianErr) {_context.next = 9;break;}
                          console.error('\u5C01\u9762\u641C\u7D22\u56FE\u4E66 ' + qidianBookId + ' \u5931\u8D25', err);return _context.abrupt('return',
                          {});case 9:

                          // get bookName
                          htmlStart = qidianBookHtml.indexOf('<body>');
                          htmlEnd = qidianBookHtml.indexOf('</body>');
                          $ = _cheerio2.default.load(qidianBookHtml.substring(htmlStart, htmlEnd + 7));
                          bookName = $('a[href="//book.qidian.com/info/' + qidianBookId + '"]').text();_context.next = 15;return (
                            _zhuishu2.default.searchBooks({
                              key: bookName }));case 15:_ref5 = _context.sent;zhuishuBooks = _ref5.data;zhuishuErr = _ref5.err;if (!

                          zhuishuErr) {_context.next = 21;break;}
                          console.error('\u5C01\u9762\u641C\u7D22\u56FE\u4E66 ' + bookName + ' \u5931\u8D25', err);return _context.abrupt('return',
                          {});case 21:


                          console.log('\u5C01\u9762\u641C\u7D22\u5230\u56FE\u4E66 ' + zhuishuBooks[0].title);return _context.abrupt('return',
                          {
                            _id: '' + zhuishuBooks[0]._id,
                            pic: raw.Pic });case 23:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x3) {return _ref3.apply(this, arguments);};}())));case 17:covers = _context4.sent;_context4.next = 20;return (




              Promise.all(data.Group.map(function () {var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(raw) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.t0 =

                          raw.Title;_context3.t1 =
                          raw.Subtitle;_context3.next = 4;return (
                            Promise.all(raw.Data.map(function () {var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(rawBook) {var _ref8, zhuishuBooks, zhuishuErr;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                                          _zhuishu2.default.searchBooks({
                                            key: rawBook.BookName }));case 2:_ref8 = _context2.sent;zhuishuBooks = _ref8.data;zhuishuErr = _ref8.err;if (!

                                        zhuishuErr) {_context2.next = 8;break;}
                                        console.error('\u641C\u7D22\u56FE\u4E66 ' + rawBook.BookName + ' \u5931\u8D25', err);return _context2.abrupt('return',
                                        {});case 8:


                                        console.log('\u641C\u7D22\u5230\u56FE\u4E66 ' + zhuishuBooks[0].title);return _context2.abrupt('return',
                                        {
                                          _id: '' + zhuishuBooks[0]._id,
                                          title: rawBook.BookName,
                                          author: rawBook.Author,
                                          cover: 'https://qidian.qpic.cn/qdbimg/349573/' + rawBook.BookId + '/180',
                                          majorCate: rawBook.CategoryName,
                                          minorCate: undefined,
                                          shortIntro: rawBook.Description,
                                          lastChapter: rawBook.LastVipUpdateChapterName || rawBook.LastUpdateChapterName });case 10:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x5) {return _ref7.apply(this, arguments);};}())));case 4:_context3.t2 = _context3.sent;return _context3.abrupt('return', { title: _context3.t0, subTitle: _context3.t1, books: _context3.t2 });case 6:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function (_x4) {return _ref6.apply(this, arguments);};}())));case 20:groups = _context4.sent;





            result = {
              covers: covers,
              groups: groups };


            cachedRecommends[key] = result;

            ctx.status = 200;
            ctx.body = result;case 25:case 'end':return _context4.stop();}}}, _callee4, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


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
BookApi.get('/', function () {var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {var _ref10, data, err;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              _zhuishu2.default.searchBooks(ctx.query));case 2:_ref10 = _context5.sent;data = _ref10.data;err = _ref10.err;if (!

            err) {_context5.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context5.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data || [];case 11:case 'end':return _context5.stop();}}}, _callee5, undefined);}));return function (_x6, _x7) {return _ref9.apply(this, arguments);};}());


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
BookApi.get('/:bookId', function () {var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, next) {var _ref12, data, err;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              _zhuishu2.default.bookInfo({
                bookId: ctx.params.bookId }));case 2:_ref12 = _context6.sent;data = _ref12.data;err = _ref12.err;if (!


            err) {_context6.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context6.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context6.stop();}}}, _callee6, undefined);}));return function (_x8, _x9) {return _ref11.apply(this, arguments);};}());


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
BookApi.get('/:bookId/chapters/newest', function () {var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, next) {var _ref14, data, err;return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (

              _zhuishu2.default.newestChapter({
                bookIds: [ctx.params.bookId] }));case 2:_ref14 = _context7.sent;data = _ref14.data;err = _ref14.err;if (!


            err) {_context7.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context7.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data[ctx.params.bookId];case 11:case 'end':return _context7.stop();}}}, _callee7, undefined);}));return function (_x10, _x11) {return _ref13.apply(this, arguments);};}());


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
BookApi.get('/:bookId/chapters', function () {var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx, next) {var _ref16, data, err;return _regenerator2.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
              _zhuishu2.default.chapters({
                bookId: ctx.params.bookId }));case 2:_ref16 = _context8.sent;data = _ref16.data;err = _ref16.err;if (!


            err) {_context8.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context8.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context8.stop();}}}, _callee8, undefined);}));return function (_x12, _x13) {return _ref15.apply(this, arguments);};}());


/**
                                                                                                                                                                                 * @swagger
                                                                                                                                                                                 * /api/v2/books/{sourceId}/chapters:
                                                                                                                                                                                 *   get:
                                                                                                                                                                                 *     description: 某个小说源的章节内容
                                                                                                                                                                                 *     produces:
                                                                                                                                                                                 *       - application/json
                                                                                                                                                                                 */
BookApi.get('/:sourceId/chapters', function () {var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(ctx, next) {var _ref18, data, err;return _regenerator2.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
              _zhuishu2.default.chaptersBySource({
                sourceId: ctx.params.sourceId }));case 2:_ref18 = _context9.sent;data = _ref18.data;err = _ref18.err;if (!


            err) {_context9.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context9.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context9.stop();}}}, _callee9, undefined);}));return function (_x14, _x15) {return _ref17.apply(this, arguments);};}());


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
BookApi.get('/chapter/:link', function () {var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(ctx, next) {var raw, parsed, _ref20, data, err;return _regenerator2.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
            raw = ctx.params.link;
            parsed = new Buffer(raw.replace('xiegang', '/'), 'base64').toString();_context10.next = 4;return (
              _zhuishu2.default.content({
                link: encodeURIComponent(parsed) }));case 4:_ref20 = _context10.sent;data = _ref20.data;err = _ref20.err;if (!


            err) {_context10.next = 11;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context10.abrupt('return');case 11:




            ctx.status = 200;
            ctx.body = data;case 13:case 'end':return _context10.stop();}}}, _callee10, undefined);}));return function (_x16, _x17) {return _ref19.apply(this, arguments);};}());


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
BookApi.get('/:bookId/comments', function () {var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(ctx, next) {var _ref22, data, err;return _regenerator2.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:_context11.next = 2;return (
              _zhuishu2.default.comments({
                bookId: ctx.params.bookId,
                pageIndex: ctx.query.pageIndex }));case 2:_ref22 = _context11.sent;data = _ref22.data;err = _ref22.err;if (!


            err) {_context11.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context11.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context11.stop();}}}, _callee11, undefined);}));return function (_x18, _x19) {return _ref21.apply(this, arguments);};}());exports.default =


BookApi;
//# sourceMappingURL=book.api2.js.map