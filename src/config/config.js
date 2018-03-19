const proxyHost = 'https://mage.if.qidian.com/Atom.axd/Api';
const zhuishuHost = {
  main: 'http://api.zhuishushenqi.com',
  second: 'http://api05iye5.zhuishushenqi.com',
  chapter: 'http://chapterup.zhuishushenqi.com/chapter',
  statics: 'https://statics.zhuishushenqi.com',
};

export default {
  urls: {
    recommend: `${proxyHost}/BookStore/GetBookStoreList`,
    search: `${proxyHost}/Search/GetBookStoreWithBookList`,
    info: `${proxyHost}/Book/Get`,
    chapters: `${proxyHost}/Book/GetChapterList`,
    comments: `${proxyHost}/Review/Get`,
  },
  v2_urls: {
    cats: () => `${zhuishuHost.main}/cats/lv2/statistics`,
    subCats: () => `${zhuishuHost.main}/cats/lv2`,
    catBooks: () => `${zhuishuHost.main}/book/by-categories`,
    ranks: () => `${zhuishuHost.main}/ranking/gender`,
    rankBooks: (rankId) => `${zhuishuHost.main}/ranking/${rankId}`,
    authorBooks: (author) => `${zhuishuHost.main}/book/accurate-search?author=${encodeURI(author)}&packageName=com.ifmoc.ZhuiShuShenQi`,
    search: (query) => `${zhuishuHost.main}/book/fuzzy-search?query=${encodeURI(query)}`,
    info: (bookId) => `${zhuishuHost.main}/book/${bookId}`,
    sources: (bookId) => `${zhuishuHost.main}/atoc?view=summary&book=${bookId}`,
    newestChapter: (bookIds = []) => `${zhuishuHost.second}/book?view=updated&id=${bookIds.join(',')}`,
    chapters: (bookId) => `${zhuishuHost.main}/mix-atoc/${bookId}?view=chapters`,
    chaptersBySource: (sourceId) => `${zhuishuHost.main}/atoc/${sourceId}?view=chapters`,
    content: (link) => `${zhuishuHost.chapter}/${link}`,
    statics: () => `${zhuishuHost.statics}`,
  },
};
