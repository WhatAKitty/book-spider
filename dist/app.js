'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBunyanLogger = require('koa-bunyan-logger');

var _koaBunyanLogger2 = _interopRequireDefault(_koaBunyanLogger);

var _book = require('./api/book.api');

var _book2 = _interopRequireDefault(_book);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default({
  prefix: '/api/v1'
});

router.use(_book2.default.routes(), _book2.default.allowedMethods());

app.use((0, _koaBunyanLogger2.default)({
  name: 'book-spider',
  level: 'debug'
})).use(_koaBunyanLogger2.default.requestIdContext()).use(_koaBunyanLogger2.default.requestLogger()).use(router.routes()).use(router.allowedMethods());

(0, _db.init)(function () {
  app.listen(3000);
});
//# sourceMappingURL=app.js.map