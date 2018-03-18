import 'babel-polyfill';
import 'isomorphic-fetch';
import expect from 'expect.js';

import BQGParser from '../src/core/parser/bqg.parser';

describe('test bqg parser', () => {
  it('test parser create', async () => {
    expect(() => {
      new BQGParser();
    }).not.throwError();
  }).timeout(10000);
  it('test parser get', async () => {
    const parser = new BQGParser();
    const html = await parser.obainHtml('http://www.biquge5200.com/modules/article/search.php?searchkey=%E7%8E%8B%E7%88%B7');
    expect(html).to.be.ok();
  }).timeout(10000);
  it('test parser searchBook', async () => {
    const parser = new BQGParser();
    const bookInfo = await parser.searchBook('斗破苍穹');
    expect(bookInfo).to.be.ok();
    expect(bookInfo).to.have.keys('link', 'name');
  }).timeout(10000);
  it('test parser searchChapters', async () => {
    const parser = new BQGParser();
    const chapters = await parser.searchChapters('http://www.biquge5200.com/7_7491/');
    expect(chapters).to.be.ok();
    expect(chapters).to.not.empty();
  }).timeout(10000);
  it('test parser searchContent', async () => {
    const parser = new BQGParser();
    const content = await parser.parseContent('http://www.biquge5200.com/7_7491/5893464.html');
    expect(content).to.be.ok();
    expect(content).to.not.empty();
  }).timeout(10000);
});
