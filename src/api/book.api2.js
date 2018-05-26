
import Router from 'koa-router';
import ZhuishuClient from '../zhuishu.client';
import QidianClient from '../qidian.client';
import parserFactory from '../core/parser';
import cheerio from 'cheerio';

const BookApi = new Router({
  prefix: '/api/v2/books',
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
 *       _id:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       longIntro:
 *         type: string
 *       conver:
 *         type: string
 *       creater:
 *         type: number
 *       majorCate:
 *         type: string
 *       minorCate:
 *         type: string
 *       rating:
 *         type: object
 *         properties:
 *           count:
 *             type: number,
 *           score:
 *             type: number,
 *           isEffect:
 *             type: boolean,
 *       hasCopyright:
 *         type: boolean
 *       updated:
 *         type: string
 *       chaptersCount:
 *         type: number
 *       lastChapter:
 *         type: string
 *       gender:
 *         type: array
 *       tags:
 *         type: array
 *       cat:
 *         type: string
 *   Recommends:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Book'
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
 * /api/v2/books/recommends:
 *   get:
 *     description: 推荐书籍
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: gender
 *         description: 分类（'male', 'female', 'press'）
 *         in: query
 *         required: true
 *         type: string
 *       - name: start
 *         description: 开始索引
 *         in: query
 *         required: false
 *         type: integer
 *       - name: limit
 *         description: 总查询条数
 *         in: query
 *         required: false
 *         type: integer
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
const cachedRecommends = {};
BookApi.get('/recommends', async (ctx, next) => {
  const date = new Date();
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  if (cachedRecommends[key]) {
    ctx.status = 200;
    ctx.body = cachedRecommends[key];
    return;
  }

  const { data, err } = await QidianClient.recommends();

  if (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
    return;
  }

  // wrap covers
  const covers = await Promise.all(data.CoverList.map(async raw => {
    const qidianBookId = raw.ActionUrl.substring('QDReader://ShowBook/'.length, raw.ActionUrl.length);
    const { data: qidianBookHtml, err: qidianErr } = await QidianClient.bookInfoHtml({ bookId: qidianBookId });
    if (qidianErr) {
      console.error(`封面搜索图书 ${qidianBookId} 失败`, err);
      return {};
    }
    // get bookName
    const htmlStart = qidianBookHtml.indexOf('<body>');
    const htmlEnd = qidianBookHtml.indexOf('</body>');
    const $ = cheerio.load(qidianBookHtml.substring(htmlStart, htmlEnd + 7));
    const bookName = $(`a[href="//book.qidian.com/info/${qidianBookId}"]`).text();
    const { data: zhuishuBooks, err: zhuishuErr } = await ZhuishuClient.searchBooks({
      key: bookName,
    });
    if (zhuishuErr) {
      console.error(`封面搜索图书 ${bookName} 失败`, err);
      return {};
    }

    console.log(`封面搜索到图书 ${zhuishuBooks[0].title}`);
    return {
      _id: `${zhuishuBooks[0]._id}`,
      pic: raw.Pic,
    };
  }));

  // wrap groups
  const groups = await Promise.all(data.Group.map(async raw => {
    return {
      title: raw.Title,
      subTitle: raw.Subtitle,
      books: await Promise.all(raw.Data.map(async rawBook => {
        const { data: zhuishuBooks, err: zhuishuErr } = await ZhuishuClient.searchBooks({
          key: rawBook.BookName,
        });
        if (zhuishuErr) {
          console.error(`搜索图书 ${rawBook.BookName} 失败`, err);
          return {};
        }

        console.log(`搜索到图书 ${zhuishuBooks[0].title}`);
        return {
          _id: `${zhuishuBooks[0]._id}`,
          title: rawBook.BookName,
          author: rawBook.Author,
          cover: `https://qidian.qpic.cn/qdbimg/349573/${rawBook.BookId}/180`,
          majorCate: rawBook.CategoryName,
          minorCate: undefined,
          shortIntro: rawBook.Description,
          lastChapter: rawBook.LastVipUpdateChapterName || rawBook.LastUpdateChapterName,
        };
      })),
    };
  }));

  const result = {
    covers,
    groups,
  };

  cachedRecommends[key] = result;

  ctx.status = 200;
  ctx.body = result;
});

/**
 * @swagger
 * /api/v2/books:
 *   get:
 *     description: 图书查询
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: 关键字
 *         in: query
 *         required: false
 *         type: string
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
  const { data, err } = await ZhuishuClient.searchBooks(ctx.query);

  if (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = data || [];
});

/**
 * @swagger
 * /api/v2/books/{bookId}:
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
  const { data, err } = await ZhuishuClient.bookInfo({
    bookId: ctx.params.bookId,
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
 * /api/v2/books/{bookId}/chapters/newest:
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
  const { data, err } = await ZhuishuClient.newestChapter({
    bookIds: [ctx.params.bookId],
  });

  if (err) {
    ctx.status = 400;
    ctx.body = {
      msg: err,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = data[ctx.params.bookId];
});

/**
 * @swagger
 * /api/v2/books/{bookId}/chapters:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: string
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
BookApi.get('/:bookId/chapters', async (ctx, next) => {
  const { data, err } = await ZhuishuClient.chapters({
    bookId: ctx.params.bookId,
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
 * /api/v2/books/{sourceId}/chapters:
 *   get:
 *     description: 某个小说源的章节内容
 *     produces:
 *       - application/json
 */
BookApi.get('/:sourceId/chapters', async (ctx, next) => {
  const { data, err } = await ZhuishuClient.chaptersBySource({
    sourceId: ctx.params.sourceId,
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
 * /api/v2/books/chapter/{link}:
 *   parameters:
 *     - name: source
 *       description: 源站编号
 *       in: path
 *       required: true
 *       type: string
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
 *             title:
 *               type: string
 *       400:
 *         description: 无法获取图书章节内容
 *         schema:
 *           $ref: '#/definitions/BAD404'
 */
BookApi.get('/chapter/:link', async (ctx, next) => {
  const raw = ctx.params.link;
  const parsed = new Buffer(raw.replace('xiegang', '/'), 'base64').toString();
  const { data, err } = await ZhuishuClient.content({
    link: encodeURIComponent(parsed),
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
 * /api/v2/books/{bookId}/comments:
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
  const { data, err } = await ZhuishuClient.comments({
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

export default BookApi;

