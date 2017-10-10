const proxyHost = 'https://mage.if.qidian.com/Atom.axd/Api';

export default {
  urls: {
    recommend: `${proxyHost}/BookStore/GetBookStoreList`,
    search: `${proxyHost}/Search/GetBookStoreWithBookList`,
    info: `${proxyHost}/Book/Get`,
    chapters: `${proxyHost}/Book/GetChapterList`,
    comments: `${proxyHost}/Review/Get`,
  },
};
