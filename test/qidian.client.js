import 'babel-polyfill';
import 'isomorphic-fetch';
import expect from 'expect.js';

import QidianClient from '../src/qidian.client.js'

describe('test qidian client', () => {
  it('test recommends', async () => {
    const { data, err } = await QidianClient.recommends();
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).have.key('CoverList');
    expect(data).have.key('Group');
    expect(data.CoverList).to.not.empty();
    expect(data.Group).to.not.empty();
  }).timeout(10000);
  it('test search books', async () => {
    const { data, err } = await QidianClient.searchBooks();
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book info', async () => {
    const { data, err } = await QidianClient.bookInfo({ bookId: 1003759751 });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book chapters', async () => {
    const { data, err } = await QidianClient.chapters({ bookId: 1003759751 });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
  it('test book comments', async () => {
    const { data, err } = await QidianClient.comments({ bookId: 1003759751 });
    expect(err).to.be(undefined);
    expect(data).to.ok();
    expect(data).to.not.empty();
  }).timeout(10000);
});
