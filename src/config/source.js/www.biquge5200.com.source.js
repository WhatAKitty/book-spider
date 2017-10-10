
export default {
  key: 'bqg',
  urls: {
    searchPage: 'http://www.biquge5200.com/',
    searchBook: 'http://www.biquge5200.com/modules/article/search.php',
  },
  eles: {
    search: '#main > #hotcontent > .grid > tbody > tr[align!="center"]',
    title: 'td.odd > a',
    chapter: '.box_con > #list > dl > dd > a',
    content: '#content',
  },
};
