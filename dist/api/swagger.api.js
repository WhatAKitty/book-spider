'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _swaggerJsdoc = require('swagger-jsdoc');var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SwaggerApi = new _koaRouter2.default();

SwaggerApi.get('/api/v1/swagger/api-docs.json', function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            ctx.status = 200;
            ctx.body = (0, _swaggerJsdoc2.default)({
              swaggerDefinition: {
                info: {
                  title: 'Book Spider', // Title (required)
                  version: '1.0.0' // Version (required)
                } },

              apis: [
              _path2.default.join(__dirname, './book.api.js')]
              // Path to the API docs
            });case 2:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


SwaggerApi.get('/api/v2/swagger/api-docs.json', function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            ctx.status = 200;
            ctx.body = (0, _swaggerJsdoc2.default)({
              swaggerDefinition: {
                info: {
                  title: 'Book Spider', // Title (required)
                  version: '2.0.0' // Version (required)
                } },

              apis: [
              _path2.default.join(__dirname, './book.api2.js'),
              _path2.default.join(__dirname, './rank.api2.js')]
              // Path to the API docs
            });case 2:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());exports.default =


SwaggerApi;
//# sourceMappingURL=swagger.api.js.map