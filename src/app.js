import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-bunyan-logger';

import BookApi from './api/book.api';
import { init } from './db';

const app = new Koa();
const router = new Router({
  prefix: '/api/v1',
});

router.use(BookApi.routes(), BookApi.allowedMethods());

app
  .use(logger({
    name: 'book-spider',
    level: 'debug',
  }))
  .use(logger.requestIdContext())
  .use(logger.requestLogger())
  .use(router.routes())
  .use(router.allowedMethods());

init(() => {
  app.listen(3000);
});
