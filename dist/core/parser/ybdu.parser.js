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

var _common = require('./common.parser');

var _common2 = _interopRequireDefault(_common);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _wwwYbduCom = require('../../config/source.js/www.ybdu.com.source');

var _wwwYbduCom2 = _interopRequireDefault(_wwwYbduCom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YBDUParser = function (_CommonParser) {
  (0, _inherits3.default)(YBDUParser, _CommonParser);

  function YBDUParser() {
    (0, _classCallCheck3.default)(this, YBDUParser);
    return (0, _possibleConstructorReturn3.default)(this, (YBDUParser.__proto__ || Object.getPrototypeOf(YBDUParser)).call(this, {
      config: _wwwYbduCom2.default
    }));

    // this.searchPage = this.searchPage.bind(this);
  }

  /**
   * 根据图书名搜索图书
   * 
   * @param {*} bookName 
   */


  (0, _createClass3.default)(YBDUParser, [{
    key: 'searchBookByName',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(bookName) {
        var searchHtml;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get3.default)(YBDUParser.prototype.__proto__ || Object.getPrototypeOf(YBDUParser.prototype), 'obainHtml', this).call(this, (0, _get3.default)(YBDUParser.prototype.__proto__ || Object.getPrototypeOf(YBDUParser.prototype), 'getConfig', this).call(this).urls.searchBook, {
                  q: bookName,
                  s: 6637491585052650179,
                  nsid: 0
                });

              case 2:
                searchHtml = _context.sent;
                return _context.abrupt('return', searchHtml);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchBookByName(_x) {
        return _ref.apply(this, arguments);
      }

      return searchBookByName;
    }()
  }]);
  return YBDUParser;
}(_common2.default);

exports.default = YBDUParser;
//# sourceMappingURL=ybdu.parser.js.map