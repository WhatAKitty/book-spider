
import Router from 'koa-router';
import QidianClient from '../qidian.client';
import parserFactory from '../core/parser';

const BookApi = new Router({
  prefix: '/books',
});

/**
 * @swagger
 * definitions:
 *   BAD404:
 *     type: object
 *     properties:
 *       msg:
 *         type: object
 *   Book:
 *     type: object
 *     properties:
 *       BookId:
 *         type: number
 *       BookName:
 *         type: string
 *       AuthorId:
 *         type: number
 *       AuthorName:
 *         type: string
 *       Author:
 *         type: string
 *       CategoryId:
 *         type: number
 *       CategoryName:
 *         type: string
 *       ImageStatus:
 *         type: number
 *       LastUpdateChapterID:
 *         type: number
 *       LastUpdateChapterName:
 *         type: string
 *       LastChapterUpdateTime:
 *         type: number
 *       LastVipUpdateChapterId:
 *         type: number
 *       LastVipUpdateChapterName:
 *         type: string
 *       LastVipChapterUpdateTime:
 *         type: number
 *       IsVip:
 *         type: number
 *       BookStatus:
 *         type: number
 *       WordsCount:
 *         type: number
 *       Label:
 *         type: string
 *       IsQin:
 *         type: number
 *       BssReadTotal:
 *         type: number
 *       BssRecomTotal:
 *         type: number
 *       Price:
 *         type: number
 *       NewPrice:
 *         type: number
 *       Recommendation:
 *         type: string
 *       RecommenId:
 *         type: number
 *       GroupName:
 *         type: string
 *       ReadingType:
 *         type: number
 *       AlgInfo:
 *         type: string
 *       PartCount:
 *         type: number
 *       SourceBookId:
 *         type: number
 *       BookPartInfo:
 *         type: string
 *       ChargeType:
 *         type: number
 *       TotalPrice:
 *         type: number
 *       Description:
 *         type: string
 *   GroupItem:
 *     type: object
 *     properties:
 *       Title:
 *         type: string
 *       Subtitle:
 *         type: string
 *       ActionUrl:
 *         type: string
 *       Direction:
 *         type: string
 *       UpdateDesc:
 *         type: string
 *       Data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Book'
 *   Cover:
 *     type: object
 *     properties:
 *       Pic:
 *         type: string
 *       ActionUrl:
 *         type: string
 *   Recommends:
 *     type: object
 *     properties:
 *       CoverList:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Cover'
 *       Group:
 *         type: array
 *         items:
 *           $ref: '#/definitions/GroupItem'
 *   Chapter:
 *     type: object
 *     properties:
 *       c:
 *         type: number
 *       n:
 *         type: string
 *       ov:
 *         type: number
 *       p:
 *         type: number
 *       t:
 *         type: number
 *       w:
 *         type: number
 *       vc:
 *         type: string
 *       ui:
 *         type: number
 *       ccs:
 *         type: number
 *       cci:
 *         type: number
 *   ChapterResp:
 *     type: object
 *     properties:
 *       BookId:
 *         type: number
 *       BookName:
 *         type: string
 *       AuthorId:
 *         type: number
 *       AuthorName:
 *         type: string
 *       Author:
 *         type: string
 *       CategoryId:
 *         type: number
 *       CategoryName:
 *         type: string
 *       ImageStatus:
 *         type: number
 *       LastUpdateChapterID:
 *         type: number
 *       LastUpdateChapterName:
 *         type: string
 *       LastChapterUpdateTime:
 *         type: number
 *       LastVipUpdateChapterId:
 *         type: number
 *       LastVipUpdateChapterName:
 *         type: string
 *       LastVipChapterUpdateTime:
 *         type: number
 *       IsVip:
 *         type: number
 *       BookStatus:
 *         type: number
 *       WordsCount:
 *         type: number
 *       Label:
 *         type: string
 *       IsQin:
 *         type: number
 *       Chapters:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Chapter'
 *       IsReload:
 *         type: number
 *       DeletedChapters:
 *         type: string
 *       Volumes:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             VolumeCode:
 *               type: string
 *             VolumeName:
 *               type: string
 *       EnableBookUnitLease:
 *         type: number
 *       EnableBookUnitBuy:
 *         type: number
 *       Units:
 *         type: string
 *       WholeSale:
 *         type: number
 *       TotalPrice:
 *         type: number
 *   Comment:
 *     type: object
 *     properties:
 *       RankName:
 *         type: string 
 *       Id:
 *         type: number
 *       ViewCount:
 *         type: number
 *       PostCount:
 *         type: number
 *       Subject:
 *         type: string
 *       UserName:
 *         type: string
 *       UserId:
 *         type: number
 *       PostDate:
 *         type: long
 *       Body:
 *         type: string
 *       Type:
 *         type: number
 *       VoteYes:
 *         type: number
 *       VoteAgainst:
 *         type: number
 *       UserHeadIcon:
 *         type: string
 *       From:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/books/recommends:
 *   get:
 *     description: 推荐书籍
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取书籍推荐
 *         schema:
 *           $ref: '#/definitions/Recommends'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 *         
 */
BookApi.get('/recommends', async (ctx, next) => {
  const { data, err } = await QidianClient.recommends(ctx.query);

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
 * /api/v1/books:
 *   get:
 *     description: 图书查询
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: channel
 *         description: 图书来源渠道
 *         in: query
 *         required: false
 *         type: integer
 *       - name: firstEntry
 *         description: 图书来源渠道
 *         in: query
 *         required: false
 *         type: integer
 *       - name: order
 *         description: 查询排序
 *         in: query
 *         required: false
 *         type: integer
 *       - name: pageIndex
 *         description: 查询开始页索引
 *         in: query
 *         required: false
 *         type: integer
 *       - name: size
 *         description: 图书字数
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功搜索到书籍
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 *         
 */
BookApi.get('/', async (ctx, next) => {
  const { data, err } = await QidianClient.searchBooks(ctx.query);

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
 * /api/v1/books/{bookId}:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 图书详情接口
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: iosDeviceType
 *         description: 是否IOS设备
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取书籍详情
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'      
 */
BookApi.get('/:bookId', async (ctx, next) => {
  const { data, err } = await QidianClient.bookInfo({
    bookId: ctx.params.bookId,
    iosDeviceType: ctx.query.iosDeviceType,
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

/**
 * @swagger
 * /api/v1/books/{bookId}/chapters/newest:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 最新图书章节列表
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: iosDeviceType
 *         description: 是否IOS设备
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取书籍详情
 *         schema:
 *           $ref: '#/definitions/ChapterResp'
 *       400:
 *         description: 无法获取书籍推荐数据
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:bookId/chapters/newest', async (ctx, next) => {
  // 通过起点获取最新章节
  const { data, err } = await QidianClient.chapters({
    bookId: ctx.params.bookId,
    pageIndex: ctx.query.pageIndex,
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

/**
 * @swagger
 * /api/v1/books/{source}/{bookId}/chapters:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: integer
 *       enum:
 *         - qbg
 *         - ybdu
 *       x-example: qbg
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 源站图书章节列表
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取图书章节列表
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               chapterId:
 *                 type: string
 *               title:
 *                 type: stirng
 *       400:
 *         description: 无法获取图书章节列表
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:source/:bookId/chapters', async (ctx, next) => {
  // 通过源站获取章节
  try {
    const chapters = await parserFactory(ctx.params.source).findChapters({ bookId: ctx.params.bookId });

    ctx.status = 200;
    ctx.body = chapters.map(chapter => ({
      chapterId: chapter.chapterId,
      title: chapter.title,
    }));
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
  }
});

/**
 * @swagger
 * /api/v1/books/{source}/{bookId}/{chapterId}:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: integer
 *       enum:
 *         - qbg
 *         - ybdu
 *       x-example: qbg
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *     - name: chapterId
 *       description: 章节编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 112
 *   get:
 *     description: 源站章节内容
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功获取图书章节内容
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *       400:
 *         description: 无法获取图书章节内容
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:source/:bookId/:chapterId', async (ctx, next) => {
  try {
    const chapter = await parserFactory(ctx.params.source).syncContent({ chapterId: ctx.params.chapterId });

    ctx.status = 200;
    ctx.body = {
      content: chapter.content,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
  }
});

/**
 * @swagger
 * /api/v1/books/{bookId}/comments:
 *   parameters:
 *     - name: bookId
 *       description: 书本编号
 *       in: path
 *       required: true
 *       type: integer
 *       x-example: 42
 *   get:
 *     description: 图书书评列表
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageIndex
 *         description: 开始索引
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取图书书评
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Comment'
 *       400:
 *         description: 无法获取图书书评
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/:bookId/comments', async (ctx, next) => {
  const { data, err } = await QidianClient.comments({
    bookId: ctx.params.bookId,
    pageIndex: ctx.query.pageIndex,
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

// /**
//  * 开启解析
//  */
// BookApi.get('/:source/:bookId/sync', async (ctx, next) => {
//   const result = await parserFactory(ctx.params.source).start({ bookId: ctx.params.bookId });

//   if (!result) {
//     ctx.status = 400;
//     ctx.body = {
//       msg: `同步书本${ctx.params.bookId}失败`,
//     };
//     return;
//   }

//   ctx.status = 200;
//   ctx.body = {
//     msg: `同步书本${ctx.params.bookId}成功`,
//   };
// });

export default BookApi;


