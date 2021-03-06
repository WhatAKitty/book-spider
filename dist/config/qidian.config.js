'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  urls: {
    search: 'https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithBookList?action=-1&channel=-1&firstEntry=1&order=-1&p=all&pageIndex=1&size=-1&type=0&update=-1&vipBoutiqueSignstatus=-1a-1a-1'
  }
};

// // 无
// https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithBookList?action=-1&channel=-1&firstEntry=1&order=-1&p=all&pageIndex=4&size=-1&type=0&update=-1&vipBoutiqueSignstatus=-1a-1a-1
// // 玄幻
// https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithBookList?action=-1&channel=21&firstEntry=0&order=-1&p=all&pageIndex=1&size=-1&type=0&update=-1&vipBoutiqueSignstatus=-1a-1a-1
// // 玄幻、总收藏排序
// https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithBookList?action=-1&channel=21&firstEntry=0&order=9&p=all&pageIndex=1&size=-1&type=0&update=-1&vipBoutiqueSignstatus=-1a-1a-1
// // 玄幻、总收藏排序、200万以上
// https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithBookList?action=-1&channel=21&firstEntry=0&order=9&p=all&pageIndex=1&size=5&type=0&update=-1&vipBoutiqueSignstatus=-1a-1a-1

// // 分析
// "Orders": [{
//   "Value": "-1",
//   "Name": "人气排序"
// }, {
//   "Value": "6",
//   "Name": "更新时间排序"
// }, {
//   "Value": "3",
//   "Name": "总推荐排序"
// }, {
//   "Value": "9",
//   "Name": "总收藏排序"
// }, {
//   "Value": "10",
//   "Name": "总月票排序"
// }, {
//   "Value": "11",
//   "Name": "会员周点击排序"
// }, {
//   "Value": "12",
//   "Name": "会员月点击排序"
// }, {
//   "Value": "13",
//   "Name": "会员总点击排序"
// }, {
//   "Value": "5",
//   "Name": "字数排序"
// }],
// "Filters": [{
//   "Title": "站点",
//   "Name": "site",
//   "SelectType": 0,
//   "Groups": [{
//     "Value": "0",
//     "Name": "女生"
//   }, {
//     "Value": "1",
//     "Name": "主站"
//   }, {
//     "Value": "2",
//     "Name": "文学"
//   }, {
//     "Value": "98",
//     "Name": "传统"
//   }]
// }, {
//   "Title": "分类",
//   "Name": "channel",
//   "SelectType": 1,
//   "Groups": [{
//     "Value": "10",
//     "Name": "灵异",
//     "Childs": [{
//       "Value": "100070",
//       "Name": "恐怖惊悚"
//     }, {
//       "Value": "100071",
//       "Name": "灵异鬼怪"
//     }, {
//       "Value": "100072",
//       "Name": "悬疑侦探"
//     }, {
//       "Value": "100073",
//       "Name": "寻墓探险"
//     }, {
//       "Value": "100074",
//       "Name": "风水秘术"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "7",
//     "Name": "游戏",
//     "Childs": [{
//       "Value": "100093",
//       "Name": "游戏异界"
//     }, {
//       "Value": "20103",
//       "Name": "游戏主播"
//     }, {
//       "Value": "20102",
//       "Name": "游戏系统"
//     }, {
//       "Value": "100090",
//       "Name": "电子竞技"
//     }, {
//       "Value": "100091",
//       "Name": "虚拟网游"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "21",
//     "Name": "玄幻",
//     "Childs": [{
//       "Value": "100001",
//       "Name": "东方玄幻"
//     }, {
//       "Value": "100002",
//       "Name": "异世大陆"
//     }, {
//       "Value": "100003",
//       "Name": "王朝争霸"
//     }, {
//       "Value": "100004",
//       "Name": "高武世界"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "9",
//     "Name": "科幻",
//     "Childs": [{
//       "Value": "100119",
//       "Name": "末世危机"
//     }, {
//       "Value": "100112",
//       "Name": "古武机甲"
//     }, {
//       "Value": "100113",
//       "Name": "未来世界"
//     }, {
//       "Value": "100115",
//       "Name": "星际文明"
//     }, {
//       "Value": "100116",
//       "Name": "超级科技"
//     }, {
//       "Value": "100117",
//       "Name": "时空穿梭"
//     }, {
//       "Value": "100118",
//       "Name": "进化变异"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "8",
//     "Name": "体育",
//     "Childs": [{
//       "Value": "100100",
//       "Name": "篮球运动"
//     }, {
//       "Value": "100101",
//       "Name": "体育赛事"
//     }, {
//       "Value": "100103",
//       "Name": "足球运动"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "2",
//     "Name": "武侠",
//     "Childs": [{
//       "Value": "20100",
//       "Name": "武侠同人"
//     }, {
//       "Value": "20099",
//       "Name": "古武未来"
//     }, {
//       "Value": "100020",
//       "Name": "传统武侠"
//     }, {
//       "Value": "100021",
//       "Name": "武侠幻想"
//     }, {
//       "Value": "100022",
//       "Name": "国术无双"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "1",
//     "Name": "奇幻",
//     "Childs": [{
//       "Value": "100010",
//       "Name": "现代魔法"
//     }, {
//       "Value": "100011",
//       "Name": "剑与魔法"
//     }, {
//       "Value": "100012",
//       "Name": "史诗奇幻"
//     }, {
//       "Value": "100013",
//       "Name": "黑暗幻想"
//     }, {
//       "Value": "100014",
//       "Name": "历史神话"
//     }, {
//       "Value": "100015",
//       "Name": "另类幻想"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "12",
//     "Name": "二次元",
//     "Childs": [{
//       "Value": "100120",
//       "Name": "变身入替"
//     }, {
//       "Value": "100121",
//       "Name": "原生幻想"
//     }, {
//       "Value": "100122",
//       "Name": "青春日常"
//     }, {
//       "Value": "100124",
//       "Name": "衍生同人"
//     }, {
//       "Value": "100125",
//       "Name": "搞笑吐槽"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "4",
//     "Name": "都市",
//     "Childs": [{
//       "Value": "100041",
//       "Name": "都市生活"
//     }, {
//       "Value": "100141",
//       "Name": "娱乐明星"
//     }, {
//       "Value": "100042",
//       "Name": "恩怨情仇"
//     }, {
//       "Value": "100142",
//       "Name": "官场沉浮"
//     }, {
//       "Value": "100143",
//       "Name": "商战职场"
//     }, {
//       "Value": "100044",
//       "Name": "异术超能"
//     }, {
//       "Value": "100048",
//       "Name": "青春校园"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "20076",
//     "Name": "短篇",
//     "Childs": [{
//       "Value": "100151",
//       "Name": "短篇小说"
//     }, {
//       "Value": "100152",
//       "Name": "儿童文学"
//     }, {
//       "Value": "100153",
//       "Name": "美文游记"
//     }, {
//       "Value": "100154",
//       "Name": "生活随笔"
//     }, {
//       "Value": "100155",
//       "Name": "评论文集"
//     }, {
//       "Value": "100156",
//       "Name": "诗歌散文"
//     }, {
//       "Value": "100157",
//       "Name": "人物传记"
//     }, {
//       "Value": "100158",
//       "Name": "影视剧本"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "22",
//     "Name": "仙侠",
//     "Childs": [{
//       "Value": "20101",
//       "Name": "古典仙侠"
//     }, {
//       "Value": "100030",
//       "Name": "修真文明"
//     }, {
//       "Value": "100031",
//       "Name": "幻想修仙"
//     }, {
//       "Value": "100032",
//       "Name": "现代修真"
//     }, {
//       "Value": "100033",
//       "Name": "神话修真"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "15",
//     "Name": "现实",
//     "Childs": [{
//       "Value": "20104",
//       "Name": "社会乡土"
//     }, {
//       "Value": "100046",
//       "Name": "现实百态"
//     }, {
//       "Value": "100047",
//       "Name": "爱情婚姻"
//     }, {
//       "Value": "20108",
//       "Name": "青春文学"
//     }, {
//       "Value": "20107",
//       "Name": "成功励志"
//     }, {
//       "Value": "20106",
//       "Name": "文学艺术"
//     }, {
//       "Value": "20105",
//       "Name": "生活时尚"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "5",
//     "Name": "历史",
//     "Childs": [{
//       "Value": "100060",
//       "Name": "架空历史"
//     }, {
//       "Value": "100061",
//       "Name": "秦汉三国"
//     }, {
//       "Value": "100062",
//       "Name": "上古先秦"
//     }, {
//       "Value": "100063",
//       "Name": "两晋隋唐"
//     }, {
//       "Value": "100064",
//       "Name": "五代十国"
//     }, {
//       "Value": "100065",
//       "Name": "两宋元明"
//     }, {
//       "Value": "100066",
//       "Name": "清史民国"
//     }, {
//       "Value": "100067",
//       "Name": "外国历史"
//     }, {
//       "Value": "100068",
//       "Name": "历史传记"
//     }, {
//       "Value": "100069",
//       "Name": "民间传说"
//     }],
//     "FreeType": 1
//   }, {
//     "Value": "6",
//     "Name": "军事",
//     "Childs": [{
//       "Value": "100050",
//       "Name": "军旅生涯"
//     }, {
//       "Value": "100051",
//       "Name": "军事战争"
//     }, {
//       "Value": "100052",
//       "Name": "战争幻想"
//     }, {
//       "Value": "100053",
//       "Name": "抗战烽火"
//     }, {
//       "Value": "100054",
//       "Name": "谍战特工"
//     }],
//     "FreeType": 1
//   }]
// }, {
//   "Title": "字数",
//   "Name": "size",
//   "SelectType": 0,
//   "Groups": [{
//     "Value": "-1",
//     "Name": "不限"
//   }, {
//     "Value": "1",
//     "Name": "30万以下"
//   }, {
//     "Value": "2",
//     "Name": "30万-50万"
//   }, {
//     "Value": "3",
//     "Name": "50万-100万"
//   }, {
//     "Value": "4",
//     "Name": "100万-200万"
//   }, {
//     "Value": "5",
//     "Name": "200万以上"
//   }]
// }, {
//   "Title": "写作进度",
//   "Name": "action",
//   "SelectType": 0,
//   "Groups": [{
//     "Value": "-1",
//     "Name": "全部"
//   }, {
//     "Value": "0",
//     "Name": "连载"
//   }, {
//     "Value": "1",
//     "Name": "完本"
//   }]
// }, {
//   "Title": "更新时间",
//   "Name": "update",
//   "SelectType": 0,
//   "Groups": [{
//     "Value": "-1",
//     "Name": "不限"
//   }, {
//     "Value": "3",
//     "Name": "三日内"
//   }, {
//     "Value": "7",
//     "Name": "七日内"
//   }, {
//     "Value": "15",
//     "Name": "半月内"
//   }, {
//     "Value": "31",
//     "Name": "一月内"
//   }]
// }, {
//   "Title": "其他",
//   "Name": "vipBoutiqueSignstatus",
//   "SelectType": 0,
//   "Groups": [{
//     "Value": "-1a-1a-1",
//     "Name": "不限"
//   }, {
//     "Value": "0a-1a-1",
//     "Name": "只看免费"
//   }, {
//     "Value": "1a-1a-1",
//     "Name": "只看VIP"
//   }, {
//     "Value": "-1a-1a1",
//     "Name": "只看A级签约"
//   }]
// }],
//# sourceMappingURL=qidian.config.js.map