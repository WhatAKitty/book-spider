
import path from 'path';
import Router from 'koa-router';
import swaggerJSDoc from 'swagger-jsdoc';

const SwaggerApi = new Router();

SwaggerApi.get('/api/v1/swagger/api-docs.json', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'Book Spider', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    apis: [
      path.join(__dirname, './book.api.js'),
    ], // Path to the API docs
  });
});

SwaggerApi.get('/api/v2/swagger/api-docs.json', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'Book Spider', // Title (required)
        version: '2.0.0', // Version (required)
      },
    },
    apis: [
      path.join(__dirname, './book.api2.js'),
      path.join(__dirname, './rank.api2.js'),
    ], // Path to the API docs
  });
});

export default SwaggerApi;
