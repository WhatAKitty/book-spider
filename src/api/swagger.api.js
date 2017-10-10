
import path from 'path';
import Router from 'koa-router';
import swaggerJSDoc from 'swagger-jsdoc';

const SwaggerApi = new Router({
  prefix: '/swagger',
});

const options = {
  swaggerDefinition: {
    info: {
      title: 'Book Spider', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: [
    path.join(__dirname, './book.api.js'),
  ], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

SwaggerApi.get('/api-docs.json', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = swaggerSpec;
});

export default SwaggerApi;
