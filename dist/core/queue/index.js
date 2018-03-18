'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _queue = Symbol('queue');
var _options = Symbol('options');
var _task = Symbol('task');

//sleep in Promise
var sleep = function sleep(ms) {
  return (
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, ms);
    }));

};var

Queue = function () {
  function Queue() {var task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};var options = arguments[1];(0, _classCallCheck3.default)(this, Queue);
    this[_options] = (0, _extends3.default)({
      interval: 10000 },
    options);

    this[_task] = task;
    this[_queue] = [];

    this.addData = this.addData.bind(this);
    this.run = this.run.bind(this);
    this.wait = this.wait.bind(this);
    this.waitAll = this.waitAll.bind(this);

    this.run();
  }(0, _createClass3.default)(Queue, [{ key: 'addData', value: function addData(

    data) {
      this[_queue].unshift(JSON.parse(JSON.stringify(data)));
    } }, { key: 'run', value: function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {var data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!


                true) {_context.next = 19;break;}if (
                this[_queue].length) {_context.next = 6;break;}
                console.log('[QUEUE] ' + new Date().toLocaleString('zh') + ' decet queue data, there has ' + this[_queue].length + ' data; ' + (this[_queue].length > 0 ? 'start run task with data' : ''));_context.next = 5;return (
                  this.wait());case 5:return _context.abrupt('continue', 0);case 6:



                data = this[_queue].shift();_context.prev = 7;_context.next = 10;return (



                  this[_task](data));case 10:_context.next = 15;break;case 12:_context.prev = 12;_context.t0 = _context['catch'](7);

                console.log('[QUEUE] ' + new Date().toLocaleString('zh') + ' task execute failed, will skip this data and start next one', _context.t0);case 15:_context.next = 17;return (


                  this.wait());case 17:_context.next = 0;break;case 19:case 'end':return _context.stop();}}}, _callee, this, [[7, 12]]);}));function run() {return _ref.apply(this, arguments);}return run;}() }, { key: 'wait', value: function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (




                  sleep('function' === typeof this[_options].interval ? this[_options].interval() : this[_options].interval));case 2:case 'end':return _context2.stop();}}}, _callee2, this);}));function wait() {return _ref2.apply(this, arguments);}return wait;}() }, { key: 'waitAll', value: function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (!



                this[_queue].length) {_context3.next = 5;break;}_context3.next = 3;return (
                  sleep(this[_options].interval));case 3:_context3.next = 0;break;case 5:case 'end':return _context3.stop();}}}, _callee3, this);}));function waitAll() {return _ref3.apply(this, arguments);}return waitAll;}() }]);return Queue;}();exports.default =





Queue;
//# sourceMappingURL=index.js.map