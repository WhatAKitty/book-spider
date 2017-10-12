'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaBunyanLogger = require('koa-bunyan-logger');

var _koaBunyanLogger2 = _interopRequireDefault(_koaBunyanLogger);

var _koa2SwaggerUi = require('koa2-swagger-ui');

var _koa2SwaggerUi2 = _interopRequireDefault(_koa2SwaggerUi);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _book = require('./api/book.api');

var _book2 = _interopRequireDefault(_book);

var _swagger = require('./api/swagger.api');

var _swagger2 = _interopRequireDefault(_swagger);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default({
  prefix: '/api/v1'
});

router.use(_book2.default.routes(), _book2.default.allowedMethods());
router.use(_swagger2.default.routes(), _swagger2.default.allowedMethods());

app.use((0, _koaStatic2.default)('./static', {
  maxage: 1000 * 60 * 60 * 24 * 365,
  hidden: true,
  gzip: true
})).use((0, _koaBunyanLogger2.default)({
  name: 'book-spider',
  level: 'debug'
})).use(_koaBunyanLogger2.default.requestIdContext()).use(_koaBunyanLogger2.default.requestLogger()).use(router.routes()).use(router.allowedMethods()).use((0, _koa2SwaggerUi2.default)({
  routePrefix: '/swagger-ui', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/api/v1/swagger/api-docs.json' // example path to json
  }
}));

(0, _db.init)(function () {
  app.listen(3000);
});
//# sourceMappingURL=app.js.map