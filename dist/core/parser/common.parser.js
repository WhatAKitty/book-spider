'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _IParser2 = require('./IParser');

var _IParser3 = _interopRequireDefault(_IParser2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonParser = function (_IParser) {
  (0, _inherits3.default)(CommonParser, _IParser);

  function CommonParser(_ref) {
    var config = _ref.config;
    (0, _classCallCheck3.default)(this, CommonParser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CommonParser.__proto__ || Object.getPrototypeOf(CommonParser)).call(this, {
      config: config
    }));

    _this.searchBookByName = _this.searchBookByName.bind(_this);
    return _this;
  }

  /**
   * 搜索图书信息
   */


  (0, _createClass3.default)(CommonParser, [{
    key: 'searchBook',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(bookName) {
        var searchHtml, $, resultList, resultEle, $title, name, link;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.searchBookByName(bookName);

              case 2:
                searchHtml = _context.sent;

                if (!(searchHtml == null)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', null);

              case 5:
                $ = _cheerio2.default.load(searchHtml);
                resultList = $((0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'getConfig', this).call(this).eles.search).toArray();

                if (!(resultList.length === 0)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return', null);

              case 9:
                resultEle = resultList[0];
                $title = $(resultEle).find((0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'getConfig', this).call(this).eles.title);
                name = $title.text().trim();
                link = $title.attr('href');

                if (!(name != bookName.trim())) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', null);

              case 15:
                return _context.abrupt('return', {
                  name: name,
                  link: link
                });

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchBook(_x) {
        return _ref2.apply(this, arguments);
      }

      return searchBook;
    }()

    /**
     * 搜索章节
     */

  }, {
    key: 'searchChapters',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(link) {
        var chaptersHtml, $, resultList, chapters;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'obainHtml', this).call(this, link);

              case 2:
                chaptersHtml = _context2.sent;

                if (!(chaptersHtml == null)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', null);

              case 5:
                $ = _cheerio2.default.load(chaptersHtml);
                resultList = $((0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'getConfig', this).call(this).eles.chapter).toArray();

                if (!(resultList.length === 0)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', null);

              case 9:
                chapters = resultList.map(function (item) {
                  var $chapter = $(item);
                  var href = $chapter.attr('href');
                  return {
                    id: href.replace(link, '').replace(/\//g, '').replace(/\.html/g, ''),
                    title: $chapter.text(),
                    link: $chapter.attr('href')
                  };
                });

                if (!(chapters.length === 0)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', null);

              case 12:
                return _context2.abrupt('return', chapters);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function searchChapters(_x2) {
        return _ref3.apply(this, arguments);
      }

      return searchChapters;
    }()

    /**
     * 解析HTML章节内容
     */

  }, {
    key: 'parseContent',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(link) {
        var contentHtml, $, $content, chapterContent;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'obainHtml', this).call(this, link);

              case 2:
                contentHtml = _context3.sent;

                if (!(contentHtml == null)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', null);

              case 5:
                $ = _cheerio2.default.load(contentHtml);
                $content = $((0, _get3.default)(CommonParser.prototype.__proto__ || Object.getPrototypeOf(CommonParser.prototype), 'getConfig', this).call(this).eles.content);


                $content.find('br').replaceWith('\r\n');
                chapterContent = $content.text();

                console.log(chapterContent);

                if (!(!chapterContent || !chapterContent.length)) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt('return', null);

              case 12:
                return _context3.abrupt('return', chapterContent);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function parseContent(_x3) {
        return _ref4.apply(this, arguments);
      }

      return parseContent;
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

    /**
     * 根据图书名搜索图书
     * 
     * @param {*} bookName 
     */

  }, {
    key: 'searchBookByName',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(bookName) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function searchBookByName(_x4) {
        return _ref5.apply(this, arguments);
      }

      return searchBookByName;
    }()
  }]);
  return CommonParser;
}(_IParser3.default);

exports.default = CommonParser;
//# sourceMappingURL=common.parser.js.map