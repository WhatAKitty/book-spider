// import 'babel-polyfill';
// import expect from 'expect.js';

// import YBDUParser from '../src/core/parser/ybdu.parser';

// describe('test ybdu parser', () => {
//   it('test parser create', async () => {
//     expect(() => {
//       new YBDUParser({bookId: 1209977});
//     }).not.throwError();
//   }).timeout(10000);
//   it('test parser searchBook', async () => {
//     const parser = new YBDUParser({bookId: 1209977});
//     const bookInfo = await parser.searchBook('斗破苍穹');
//     expect(bookInfo).to.be.ok();
//     expect(bookInfo).to.have.keys('link', 'name');
//   }).timeout(10000);
//   it('test parser searchChapters', async () => {
//     const parser = new YBDUParser({bookId: 1209977});
//     const chapters = await parser.searchChapters('http://www.ybdu.com/xiaoshuo/9/9456/');
//     expect(chapters).to.be.ok();
//     expect(chapters).to.not.empty();
//   }).timeout(10000);
//   it('test parser searchContent', async () => {
//     const parser = new YBDUParser({bookId: 1209977});
//     const content = await parser.parseContent('http://www.ybdu.com/xiaoshuo/9/9456/1796979.html');
//     expect(content).to.be.ok();
//     expect(content).to.not.empty();
//   }).timeout(10000);
// });
