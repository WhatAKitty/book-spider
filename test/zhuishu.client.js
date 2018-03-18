import 'babel-polyfill';
import 'isomorphic-fetch';
import expect from 'expect.js';

import ZhuishuClient from '../src/zhuishu.client.js'

describe('test zhuishu client', () => {
  it('test recommends', async () => {
    const { data, err } = await ZhuishuClient.recommends({
      gender: 'male',
      major: '玄幻',
    });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test search books', async () => {
    const { data, err } = await ZhuishuClient.searchBooks({
      key: '圣墟',
    });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book info', async () => {
    const { data, err } = await ZhuishuClient.bookInfo({ bookId: '548d9c17eb0337ee6df738f5' });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
    expect(data._id).to.equal('548d9c17eb0337ee6df738f5');
  }).timeout(10000);
  it('test book chapters', async () => {
    const { data, err } = await ZhuishuClient.chapters({ bookId: '50bff3ec209793513100001c' });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book chapters by source', async () => {
    const { data, err } = await ZhuishuClient.chaptersBySource({ sourceId: '568fef99adb27bfb4b3a58dc' });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book chapters by source', async () => {
    const { data, err } = await ZhuishuClient.newestChapter({ bookIds: ['531169b3173bfacb4904ca67'] });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
    expect(data).have.key('531169b3173bfacb4904ca67');
  }).timeout(10000);
  it('test book content', async () => {
    const { data, err } = await ZhuishuClient.content({ link: 'http://chuangshi.qq.com/bk/xh/AGkEPV1jVjIAO1RjATcBbA-r-1.html' });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
    expect(data).have.keys('title', 'body');
  }).timeout(10000);
  it('test book ranks', async () => {
    const { data, err } = await ZhuishuClient.ranks();
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
    expect(data).have.keys('female', 'picture', 'male', 'epub');
  }).timeout(10000);
});
