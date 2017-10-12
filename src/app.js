import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import logger from 'koa-bunyan-logger';
import swaggerUI from 'koa2-swagger-ui';
import path from 'path';

import BookApi from './api/book.api';
import SwaggerApi from './api/swagger.api';
import { init } from './db';

const app = new Koa();
const router = new Router({
  prefix: '/api/v1',
});

router.use(BookApi.routes(), BookApi.allowedMethods());
router.use(SwaggerApi.routes(), SwaggerApi.allowedMethods());

app
  .use(serve('./static', {
    maxage: 1000 * 60 * 60 * 24 * 365,
    hidden: true,
    gzip: true,
  }))
  .use(logger({
    name: 'book-spider',
    level: 'debug',
  }))
  .use(logger.requestIdContext())
  .use(logger.requestLogger())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(swaggerUI({
    routePrefix: '/swagger-ui', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/api/v1/swagger/api-docs.json', // example path to json
    },
  }));

init(() => {
  app.listen(3000);
});
