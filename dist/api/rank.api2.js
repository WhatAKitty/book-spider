'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _zhuishu = require('../zhuishu.client');var _zhuishu2 = _interopRequireDefault(_zhuishu);
var _parser = require('../core/parser');var _parser2 = _interopRequireDefault(_parser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var RankApi = new _koaRouter2.default({
  prefix: '/api/v2/ranks' });


/**
                               * @swagger
                               * /api/v2/ranks:
                               *   get:
                               *     description: 排行榜
                               *     produces:
                               *       - application/json
                               */
RankApi.get('/', function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var _ref2, data, err;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              _zhuishu2.default.ranks());case 2:_ref2 = _context.sent;data = _ref2.data;err = _ref2.err;if (!

            err) {_context.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


/**
                                                                                                                                                                          * @swagger
                                                                                                                                                                          * /api/v2/ranks/{rankId}:
                                                                                                                                                                          *   get:
                                                                                                                                                                          *     description: 某个排行榜的书本列表
                                                                                                                                                                          *     produces:
                                                                                                                                                                          *       - application/json
                                                                                                                                                                          */
RankApi.get('/:rankId', function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {var _ref4, data, err;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              _zhuishu2.default.rankBooks({
                rankId: ctx.params.rankId }));case 2:_ref4 = _context2.sent;data = _ref4.data;err = _ref4.err;if (!


            err) {_context2.next = 9;break;}
            ctx.status = 400;
            ctx.body = {
              msg: err };return _context2.abrupt('return');case 9:




            ctx.status = 200;
            ctx.body = data;case 11:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x3, _x4) {return _ref3.apply(this, arguments);};}());exports.default =


RankApi;
//# sourceMappingURL=rank.api2.js.map