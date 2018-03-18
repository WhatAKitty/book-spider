'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _reactRestKit = require('react-rest-kit');var _reactRestKit2 = _interopRequireDefault(_reactRestKit);
var _config = require('./config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var rest = new _reactRestKit2.default({
  contentType: 'application/json',
  dataType: 'json' });


// 需要根据设备ID进行改造
// 之后计划将两者ID在设备中创建并传递给服务端进行转发请求
var machineid = '1bc908e0c5c890a263748aaaedd30a9a';
var machine__ = '4b841f8d-ad56-4bf8-ba6f-4fd47c502fb2';

var createHeader = function createHeader(_ref)







{var _ref$size = _ref.size,size = _ref$size === undefined ? '4.7.0' : _ref$size,_ref$width = _ref.width,width = _ref$width === undefined ? 750 : _ref$width,_ref$height = _ref.height,height = _ref$height === undefined ? 1334 : _ref$height,_ref$type = _ref.type,type = _ref$type === undefined ? 'AppStore' : _ref$type,_ref$osversion = _ref.osversion,osversion = _ref$osversion === undefined ? '10.30' : _ref$osversion,_ref$device = _ref.device,device = _ref$device === undefined ? 'iOS/iPhone/iPhone8,1' : _ref$device,_ref$token = _ref.token,token = _ref$token === undefined ? '1507347832421' : _ref$token;
  return new Buffer(machineid + '|' + size + '|' + width + '|' + height + '|' + type + '|' + osversion + '|5|' + device + '|199|' + type + '|3|-999|' + token + '|0|' + machine__).toString('base64');
};

var qdheader = createHeader({ token: Math.floor(Math.random() * 100000000000) });

var Qidian = {
  recommends: function recommends() {var _this = this;return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {var _ref2, data, err;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                rest.GET(_config.config.urls.recommend, {
                  rCount: 4,
                  rdm: 1507298003,
                  sId: 0 }));case 2:_ref2 = _context.sent;data = _ref2.data;err = _ref2.err;if (!


              err) {_context.next = 7;break;}return _context.abrupt('return',

              { err: err });case 7:if (!(


              data.Result !== 0)) {_context.next = 9;break;}return _context.abrupt('return',

              { err: data.Message });case 9:return _context.abrupt('return',


              {
                data: {
                  CoverList: data.CoverList,
                  Group: data.Group } });case 10:case 'end':return _context.stop();}}}, _callee, _this);}))();


  },
  searchBooks: function searchBooks() {var _this2 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {var _params$channel, channel, _params$firstEntry, firstEntry, _params$order, order, _params$pageIndex, pageIndex, _params$size, size, _params$key, key, _ref3, data, err;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_params$channel =
              params.channel, channel = _params$channel === undefined ? -1 : _params$channel, _params$firstEntry = params.firstEntry, firstEntry = _params$firstEntry === undefined ? 1 : _params$firstEntry, _params$order = params.order, order = _params$order === undefined ? -1 : _params$order, _params$pageIndex = params.pageIndex, pageIndex = _params$pageIndex === undefined ? 1 : _params$pageIndex, _params$size = params.size, size = _params$size === undefined ? -1 : _params$size, _params$key = params.key, key = _params$key === undefined ? '' : _params$key;_context2.next = 3;return (
                rest.GET(_config.config.urls.search, {
                  key: key,
                  action: -1,
                  channel: channel,
                  firstEntry: firstEntry,
                  order: order,
                  p: 'all',
                  pageIndex: pageIndex,
                  size: size,
                  type: 0,
                  update: -1,
                  vipBoutiqueSignstatus: '-1a-1a-1' }));case 3:_ref3 = _context2.sent;data = _ref3.data;err = _ref3.err;if (!


              err) {_context2.next = 8;break;}return _context2.abrupt('return',

              { err: err });case 8:if (!(


              data.Result !== 0)) {_context2.next = 10;break;}return _context2.abrupt('return',

              { err: data.Message });case 10:return _context2.abrupt('return',


              { data: data.Data });case 11:case 'end':return _context2.stop();}}}, _callee2, _this2);}))();
  },
  bookInfo: function bookInfo() {var _this3 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {var bookId, _params$iosDeviceType, iosDeviceType, _ref4, data, err;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              bookId = params.bookId, _params$iosDeviceType = params.iosDeviceType, iosDeviceType = _params$iosDeviceType === undefined ? 0 : _params$iosDeviceType;_context3.next = 3;return (
                rest.GET(_config.config.urls.info, {
                  BookId: bookId,
                  iosDeviceType: iosDeviceType,
                  isOutBook: 0,
                  preview: 0 },
                {
                  headers: {
                    'qdheader': qdheader } }));case 3:_ref4 = _context3.sent;data = _ref4.data;err = _ref4.err;if (!



              err) {_context3.next = 8;break;}return _context3.abrupt('return',

              { err: err });case 8:if (!(


              data.Result !== 0)) {_context3.next = 10;break;}return _context3.abrupt('return',

              { err: data.Message });case 10:return _context3.abrupt('return',


              { data: data.Data });case 11:case 'end':return _context3.stop();}}}, _callee3, _this3);}))();
  },
  chapters: function chapters() {var _this4 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {var bookId, _params$pageIndex2, pageIndex, _ref5, data, err;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              bookId = params.bookId, _params$pageIndex2 = params.pageIndex, pageIndex = _params$pageIndex2 === undefined ? -1 : _params$pageIndex2;_context4.next = 3;return (
                rest.GET(_config.config.urls.chapters, {
                  bookId: bookId,
                  pageIndex: pageIndex,
                  requestSource: 0,
                  timeStamp: 0 },
                {
                  headers: {
                    'qdheader': qdheader } }));case 3:_ref5 = _context4.sent;data = _ref5.data;err = _ref5.err;if (!



              err) {_context4.next = 8;break;}return _context4.abrupt('return',

              { err: err });case 8:if (!(


              data.Result !== 0)) {_context4.next = 10;break;}return _context4.abrupt('return',

              { err: data.Message });case 10:return _context4.abrupt('return',


              { data: data.Data });case 11:case 'end':return _context4.stop();}}}, _callee4, _this4);}))();
  },
  comments: function comments() {var _this5 = this;var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {var bookId, _params$pageIndex3, pageIndex, _ref6, data, err;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
              bookId = params.bookId, _params$pageIndex3 = params.pageIndex, pageIndex = _params$pageIndex3 === undefined ? 1 : _params$pageIndex3;_context5.next = 3;return (
                rest.GET(_config.config.urls.comments, {
                  ReviewType: 112,
                  bookId: bookId,
                  pageIndex: pageIndex },
                {
                  headers: {
                    'qdheader': qdheader } }));case 3:_ref6 = _context5.sent;data = _ref6.data;err = _ref6.err;if (!



              err) {_context5.next = 8;break;}return _context5.abrupt('return',

              { err: err });case 8:if (!(


              data.Result !== 0)) {_context5.next = 10;break;}return _context5.abrupt('return',

              { err: data.Message });case 10:return _context5.abrupt('return',


              { data: data.Data });case 11:case 'end':return _context5.stop();}}}, _callee5, _this5);}))();
  } };exports.default =


Qidian;
//# sourceMappingURL=qidian.client.js.map