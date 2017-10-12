'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reactRestKit = require('react-rest-kit');

var _reactRestKit2 = _interopRequireDefault(_reactRestKit);

var _randomUseragent = require('random-useragent');

var _randomUseragent2 = _interopRequireDefault(_randomUseragent);

var _qidian = require('../../qidian.client');

var _qidian2 = _interopRequireDefault(_qidian);

var _db = require('../../db');

var _queue2 = require('../queue');

var _queue3 = _interopRequireDefault(_queue2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config = Symbol('config');
var _queue = Symbol('queue');

var rest = new _reactRestKit2.default({
  contentType: 'application/json',
  dataType: 'text'
});

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var IParser = function () {
  function IParser(_ref) {
    var _this = this;

    var config = _ref.config,
        _ref$content_store = _ref.content_store,
        content_store = _ref$content_store === undefined ? false : _ref$content_store;
    (0, _classCallCheck3.default)(this, IParser);

    if (this.constructor === IParser) {
      throw new TypeError("Can not construct abstract class.");
    }
    if (this.searchBook === IParser.prototype.searchBook) {
      throw new TypeError("Please implement abstract method searchBook.");
    }
    if (this.searchChapters === IParser.prototype.searchChapters) {
      throw new TypeError("Please implement abstract method searchChapters.");
    }
    if (this.parseContent === IParser.prototype.parseContent) {
      throw new TypeError("Please implement abstract method parseContent.");
    }
    if (this.prevChapter === IParser.prototype.prevChapter) {
      throw new TypeError("Please implement abstract method prevChapter.");
    }
    if (this.nextChapter === IParser.prototype.nextChapter) {
      throw new TypeError("Please implement abstract method nextChapter.");
    }

    this[_config] = config;
    this[_queue] = new _queue3.default(function (data) {
      _this.parseJob(data);
    }, {
      interval: function interval() {
        return Math.ceil((Math.random() * 100 + 100) * 100);
      }
    });
    this.content_store = content_store;

    this.getKey = this.getKey.bind(this);
    this.getConfig = this.getConfig.bind(this);

    this.get = this.get.bind(this);
    this.start = this.start.bind(this);
    this.obainHtml = this.obainHtml.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.searchChapters = this.searchChapters.bind(this);
    this.parseJob = this.parseJob.bind(this);
    this.parseContent = this.parseContent.bind(this);
    this.prevChapter = this.prevChapter.bind(this);
    this.nextChapter = this.nextChapter.bind(this);

    this.findBook = this.findBook.bind(this);
    this.findChapters = this.findChapters.bind(this);
    this.syncChapters = this.syncChapters.bind(this);
    this.syncAllContent = this.syncAllContent.bind(this);
    this.syncContent = this.syncContent.bind(this);
  }

  (0, _createClass3.default)(IParser, [{
    key: 'getKey',
    value: function getKey() {
      return this.getConfig().key;
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this[_config];
    }
  }, {
    key: 'get',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(link, params) {
        var _ref3, data, err;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return rest.GET(link, params, {
                  headers: {
                    'User-Agent': _randomUseragent2.default.getRandom()
                  }
                });

              case 2:
                _ref3 = _context.sent;
                data = _ref3.data;
                err = _ref3.err;

                if (!err) {
                  _context.next = 8;
                  break;
                }

                console.error('request get failed ', err);
                return _context.abrupt('return', null);

              case 8:
                return _context.abrupt('return', data);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()

    /**
     * 开始解析
     */

  }, {
    key: 'start',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
        var bookId = _ref5.bookId;

        var _ref6, qdBookInfo, bookInfo, book;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findBook(bookId);

              case 2:
                _ref6 = _context2.sent;
                qdBookInfo = _ref6.qdBookInfo;
                bookInfo = _ref6.bookInfo;
                book = {
                  bookId: '' + qdBookInfo.BookId,
                  bookName: qdBookInfo.BookName,
                  link: bookInfo.link
                };

                // 获取并存储章节列表

                _context2.next = 8;
                return this.findChapters(book);

              case 8:
                if (this.content_store) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 11;
                return this[_queue].waitAll();

              case 11:
                return _context2.abrupt('return', true);

              case 12:
                _context2.next = 14;
                return syncContent(book);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start(_x3) {
        return _ref4.apply(this, arguments);
      }

      return start;
    }()

    /**
     * 根据连接获取html代码
     * @param {*} link 
     * @param {*} params
     */

  }, {
    key: 'obainHtml',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(link) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('[IParser] start obain html ', link, params);
                _context3.next = 3;
                return this.get(link, params);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function obainHtml(_x4) {
        return _ref7.apply(this, arguments);
      }

      return obainHtml;
    }()
  }, {
    key: 'parseJob',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref9) {
        var chapter = _ref9.chapter,
            book = _ref9.book;
        var bookId, bookName, chapterLink, text;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('[IParser] 开始解析文章内容');

                if (!(!chapter || !book)) {
                  _context4.next = 4;
                  break;
                }

                console.log('[IParser] 解析文章内容失败，缺少必要参数');
                return _context4.abrupt('return', false);

              case 4:
                bookId = book.bookId, bookName = book.bookName;

                // const chapterLink = `${book.link.endsWith('/') ? book.link : `${book.link}/`}${chapter.link}`;

                chapterLink = chapter.link;

                console.log('[IParser] 解析文章内容来自', chapterLink);
                _context4.next = 9;
                return this.parseContent(chapterLink);

              case 9:
                text = _context4.sent;

                if (text) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt('return', false);

              case 12:

                console.log('[IParser] parse success, start persist data into db');
                _context4.next = 15;
                return (0, _db.db)().collection('book_chapter_text').insert({
                  _id: chapter.id + '_' + this.getConfig().key,
                  chapterId: '' + chapter.id,
                  type: this.getConfig().key,
                  bookId: '' + book.bookId,
                  bookName: book.bookName,
                  title: chapter.title,
                  content: text
                });

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function parseJob(_x6) {
        return _ref8.apply(this, arguments);
      }

      return parseJob;
    }()

    /**
     * 搜索图书信息
     */

  }, {
    key: 'searchBook',
    value: function searchBook(bookName) {}

    /**
     * 搜索章节
     */

  }, {
    key: 'searchChapters',
    value: function searchChapters(link) {}

    /**
     * 解析HTML章节内容
     */

  }, {
    key: 'parseContent',
    value: function parseContent(link) {}

    // ==================== public =========================

    /**
     * 查找书籍
     */

  }, {
    key: 'findBook',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(bookId) {
        var _ref11, qdBookInfo, err, bookInfo;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _qidian2.default.bookInfo({ bookId: bookId });

              case 2:
                _ref11 = _context5.sent;
                qdBookInfo = _ref11.data;
                err = _ref11.err;

                if (!err) {
                  _context5.next = 8;
                  break;
                }

                // 获取起点图书信息失败
                // TODO 重新加入缓存队列，等待重新尝试解析
                console.error('[IParser] 获取起点图书信息失败', err);
                return _context5.abrupt('return', false);

              case 8:
                _context5.next = 10;
                return this.searchBook(qdBookInfo.BookName);

              case 10:
                bookInfo = _context5.sent;

                if (bookInfo) {
                  _context5.next = 14;
                  break;
                }

                // 不存在该本书的信息
                // TODO 发送通知，提醒该书不存在
                console.error('[IParser] 获取源站图书信息失败，该书不存在');
                return _context5.abrupt('return', false);

              case 14:
                _context5.prev = 14;
                _context5.next = 17;
                return (0, _db.db)().collection('book').save((0, _extends3.default)({}, bookInfo, {
                  bookId: '' + qdBookInfo.BookId,
                  type: this.getConfig().key,
                  _id: qdBookInfo.BookId + '_' + this.getConfig().key
                }));

              case 17:
                _context5.next = 24;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5['catch'](14);

                if (!_context5.t0) {
                  _context5.next = 24;
                  break;
                }

                console.error('[IParser] 持久化图书信息失败', _context5.t0);
                return _context5.abrupt('return', false);

              case 24:
                return _context5.abrupt('return', {
                  qdBookInfo: qdBookInfo,
                  bookInfo: bookInfo
                });

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[14, 19]]);
      }));

      function findBook(_x7) {
        return _ref10.apply(this, arguments);
      }

      return findBook;
    }()
  }, {
    key: 'findChapters',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref13) {
        var bookId = _ref13.bookId;

        var _ref14, data, err, latestChapter, result;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (bookId) {
                  _context6.next = 2;
                  break;
                }

                throw '[IParser] 查询章节缺少必要的图书编号';

              case 2:
                _context6.next = 4;
                return _qidian2.default.chapters({
                  bookId: bookId
                });

              case 4:
                _ref14 = _context6.sent;
                data = _ref14.data;
                err = _ref14.err;

                if (!err) {
                  _context6.next = 9;
                  break;
                }

                throw '[IParser] 查询章节，同步最新列表失败';

              case 9:
                latestChapter = data.Chapters[data.Chapters.length - 1];
                _context6.t0 = latestChapter;

                if (!_context6.t0) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 14;
                return (0, _db.db)().collection('book_chapters').findOne({ bookId: bookId, title: latestChapter.n, type: this.getKey() });

              case 14:
                _context6.t0 = _context6.sent;

              case 15:
                result = _context6.t0;

                if (result) {
                  _context6.next = 19;
                  break;
                }

                _context6.next = 19;
                return this.syncChapters({ bookId: bookId });

              case 19:

                console.log('start sync chapters');
                _context6.next = 22;
                return (0, _db.db)().collection('book_chapters').find({ bookId: bookId, type: this.getKey() }).sort({ sort: 1 }).toArray();

              case 22:
                return _context6.abrupt('return', _context6.sent);

              case 23:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findChapters(_x8) {
        return _ref12.apply(this, arguments);
      }

      return findChapters;
    }()
  }, {
    key: 'syncChapters',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref16) {
        var _this2 = this;

        var bookId = _ref16.bookId,
            bookName = _ref16.bookName,
            link = _ref16.link;

        var book, _ref17, qdBookInfo, bookInfo, oldChapterIds, list, chapters, duplicateIds, needToPersist;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (bookId) {
                  _context7.next = 2;
                  break;
                }

                throw '[IParser] 查询章节缺少必要的图书编号';

              case 2:
                if (!(!bookName || !link)) {
                  _context7.next = 18;
                  break;
                }

                _context7.next = 5;
                return (0, _db.db)().collection('book').findOne({ bookId: bookId, type: this.getConfig().key });

              case 5:
                book = _context7.sent;

                if (!book) {
                  _context7.next = 11;
                  break;
                }

                bookName = book.name;
                link = book.link;
                _context7.next = 18;
                break;

              case 11:
                _context7.next = 13;
                return this.findBook(bookId);

              case 13:
                _ref17 = _context7.sent;
                qdBookInfo = _ref17.qdBookInfo;
                bookInfo = _ref17.bookInfo;

                bookName = qdBookInfo.BookName;
                link = bookInfo.link;

              case 18:

                // 获取老的章节列表
                oldChapterIds = [];
                _context7.prev = 19;
                _context7.next = 22;
                return (0, _db.db)().collection('book_chapters').find({ bookId: bookId, type: this.getConfig().key }, { _id: 1 }).toArray();

              case 22:
                list = _context7.sent;

                list.forEach(function (oldChapter) {
                  oldChapterIds.push(oldChapter._id);
                });
                _context7.next = 31;
                break;

              case 26:
                _context7.prev = 26;
                _context7.t0 = _context7['catch'](19);

                if (!_context7.t0) {
                  _context7.next = 31;
                  break;
                }

                console.error('[IParser] 获取图书章节失败', _context7.t0);
                return _context7.abrupt('return', false);

              case 31:
                _context7.next = 33;
                return this.searchChapters(link);

              case 33:
                chapters = _context7.sent;


                // 存储新的章节信息
                duplicateIds = [];
                needToPersist = chapters.filter(function (chapter) {
                  if (oldChapterIds.indexOf(chapter.id + '_' + _this2.getConfig().key) === -1 && duplicateIds.indexOf(chapter.id + '_' + _this2.getConfig().key) === -1) {
                    duplicateIds.push(chapter.id + '_' + _this2.getConfig().key);
                    return true;
                  }
                  return false;
                }).map(function (chapter, index) {
                  return {
                    _id: chapter.id + '_' + _this2.getConfig().key,
                    chapterId: '' + chapter.id,
                    type: _this2.getConfig().key,
                    bookId: '' + bookId,
                    bookName: bookName,
                    title: chapter.title,
                    link: chapter.link,
                    sort: index + 1
                  };
                });
                _context7.prev = 36;
                _context7.t1 = needToPersist.length;

                if (!_context7.t1) {
                  _context7.next = 41;
                  break;
                }

                _context7.next = 41;
                return (0, _db.db)().collection('book_chapters').insertMany(needToPersist);

              case 41:
                _context7.next = 48;
                break;

              case 43:
                _context7.prev = 43;
                _context7.t2 = _context7['catch'](36);

                if (!_context7.t2) {
                  _context7.next = 48;
                  break;
                }

                console.error('[IParser] 持久化图书章节失败', _context7.t2);
                return _context7.abrupt('return', false);

              case 48:
                console.log('[IParser] 持久化图书章节成功');

                return _context7.abrupt('return', needToPersist);

              case 50:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[19, 26], [36, 43]]);
      }));

      function syncChapters(_x9) {
        return _ref15.apply(this, arguments);
      }

      return syncChapters;
    }()
  }, {
    key: 'syncContent',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref19) {
        var bookId = _ref19.bookId,
            chapterId = _ref19.chapterId;

        var chapter, chapterContent, book, _ref20, qdBookInfo, bookInfo;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (chapterId) {
                  _context8.next = 2;
                  break;
                }

                throw '[IParser] \u540C\u6B65\u56FE\u4E66\u7AE0\u8282\u7F3A\u5C11chapterId';

              case 2:
                _context8.next = 4;
                return (0, _db.db)().collection('book_chapters').findOne({ bookId: bookId, chapterId: chapterId, type: this.getKey() });

              case 4:
                chapter = _context8.sent;

                if (chapter) {
                  _context8.next = 7;
                  break;
                }

                throw '[IParser] \u672A\u627E\u5230\u7AE0\u8282' + chapterid;

              case 7:
                _context8.next = 9;
                return (0, _db.db)().collection('book_chapter_text').findOne({ bookId: bookId, chapterId: chapterId, type: this.getKey() }, { content: 1, title: 1, _id: 0 });

              case 9:
                chapterContent = _context8.sent;

                if (!chapterContent) {
                  _context8.next = 12;
                  break;
                }

                return _context8.abrupt('return', chapterContent);

              case 12:
                _context8.next = 14;
                return (0, _db.db)().collection('book').findOne({ bookId: bookId, type: this.getKey() });

              case 14:
                book = _context8.sent;

                if (book) {
                  _context8.next = 22;
                  break;
                }

                _context8.next = 18;
                return this.findBook(bookId);

              case 18:
                _ref20 = _context8.sent;
                qdBookInfo = _ref20.qdBookInfo;
                bookInfo = _ref20.bookInfo;

                book = {
                  bookId: qdBookInfo.BookId,
                  bookName: qdBookInfo.BookName,
                  link: bookInfo.link
                };

              case 22:
                _context8.next = 24;
                return this.parseJob({
                  chapter: {
                    id: chapterId,
                    title: chapter.title,
                    link: chapter.link
                  },
                  book: book
                });

              case 24:
                _context8.next = 26;
                return (0, _db.db)().collection('book_chapter_text').findOne({ bookId: bookId, chapterId: chapterId, type: this.getKey() }, { content: 1, title: 1, _id: 0 });

              case 26:
                return _context8.abrupt('return', _context8.sent);

              case 27:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function syncContent(_x10) {
        return _ref18.apply(this, arguments);
      }

      return syncContent;
    }()
  }, {
    key: 'syncAllContent',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref22) {
        var _this3 = this;

        var bookId = _ref22.bookId,
            bookName = _ref22.bookName;
        var oldChapterTextIds, list;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!bookId || !bookName)) {
                  _context9.next = 2;
                  break;
                }

                throw '[IParser] 同步图书所有文章内容缺少bookId或者bookName参数';

              case 2:

                // 获取已缓存章节内容
                oldChapterTextIds = [];
                _context9.prev = 3;
                _context9.next = 6;
                return (0, _db.db)().collection('book_chapters_text').find({ bookId: bookId, type: this.getConfig().key }, { _id: 1 }).toArray();

              case 6:
                list = _context9.sent;

                list.forEach(function (oldChapter) {
                  oldChapterTextIds.push(oldChapter._id);
                });
                _context9.next = 15;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9['catch'](3);

                if (!_context9.t0) {
                  _context9.next = 15;
                  break;
                }

                console.error('[IParser] 获取图书内容失败', _context9.t0);
                return _context9.abrupt('return', false);

              case 15:
                _context9.prev = 15;

                chapters.filter(function (chapter) {
                  return oldChapterTextIds.indexOf(chapter.id + '_' + _this3.getConfig().key) === -1;
                }).forEach(function (chapter) {
                  _this3[_queue].addData({
                    chapter: chapter,
                    book: {
                      bookId: '' + bookId,
                      bookName: bookName
                    }
                  });
                });
                _context9.next = 24;
                break;

              case 19:
                _context9.prev = 19;
                _context9.t1 = _context9['catch'](15);

                if (!_context9.t1) {
                  _context9.next = 24;
                  break;
                }

                console.error('[IParser] 加入任务队列失败', _context9.t1);
                return _context9.abrupt('return', false);

              case 24:

                console.log('[IParser] 加入任务队列成功');

                _context9.next = 27;
                return this[_queue].waitAll();

              case 27:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[3, 10], [15, 19]]);
      }));

      function syncAllContent(_x11) {
        return _ref21.apply(this, arguments);
      }

      return syncAllContent;
    }()

    /**
     * 上一章节
     */

  }, {
    key: 'prevChapter',
    value: function prevChapter() {}

    /**
     * 下一章节
     */

  }, {
    key: 'nextChapter',
    value: function nextChapter() {}
  }]);
  return IParser;
}();

exports.default = IParser;
//# sourceMappingURL=IParser.js.map