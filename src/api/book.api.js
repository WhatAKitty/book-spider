
import Router from 'koa-router';
import QidianClient from '../qidian.client';
import parserFactory from '../core/parser';

const BookApi = new Router({
  prefix: '/books',
});

/**
 * 推荐书籍
 */
BookApi.get('/recommend', async (ctx, next) => {
  const { data, err } = await QidianClient.recommends();

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
 * 图书推荐接口
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
 * 图书查询接口
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
 * 图书详情接口
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
 * 图书的章节列表
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
 * 图书的章节列表
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
 * 图书的章节内容
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
 * 图书的书评
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

/**
 * 开启解析
 */
BookApi.get('/:source/:bookId/sync', async (ctx, next) => {
  const result = await parserFactory(ctx.params.source).start({ bookId: ctx.params.bookId });

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      msg: `同步书本${ctx.params.bookId}失败`,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    msg: `同步书本${ctx.params.bookId}成功`,
  };
});

export default BookApi;


