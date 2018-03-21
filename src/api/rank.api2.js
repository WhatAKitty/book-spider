
import Router from 'koa-router';
import ZhuishuClient from '../zhuishu.client';
import parserFactory from '../core/parser';

const RankApi = new Router({
  prefix: '/api/v2/ranks',
});

/**
 * @swagger
 * /api/v2/ranks:
 *   get:
 *     description: 排行榜
 *     produces:
 *       - application/json
 */
RankApi.get('/', async (ctx, next) => {
  const { data, err } = await ZhuishuClient.ranks();

  if (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = data;
});

/**
 * @swagger
 * /api/v2/ranks/{rankId}:
 *   get:
 *     description: 某个排行榜的书本列表
 *     produces:
 *       - application/json
 */
RankApi.get('/:rankId', async (ctx, next) => {
  const { data, err } = await ZhuishuClient.rankBooks({
    rankId: ctx.params.rankId,
  });

  if (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = data;
});

export default RankApi;
