import Koa from 'koa';
import fs from 'fs';
import http from 'http';
import https from 'https';
import Router from 'koa-router';
import serve from 'koa-static';
import logger from 'koa-bunyan-logger';
import swaggerUI from 'koa2-swagger-ui';
import path from 'path';

import BookApi from './api/book.api';
import BookApiV2 from './api/book.api2';
import SwaggerApi from './api/swagger.api';
import { init } from './db';

const app = new Koa();
const router = new Router();

router.use(BookApi.routes(), BookApi.allowedMethods());
router.use(BookApiV2.routes(), BookApiV2.allowedMethods());
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
  const options = !process.env.__DEV__ && {
    key: fs.readFileSync('../cert/server.key'),
    cert: fs.readFileSync('../cert/server.crt'),
  }

  http.createServer(app.callback()).listen(3000);
  !process.env.__DEV__ && https.createServer(options, app.callback()).listen(3443);
});
