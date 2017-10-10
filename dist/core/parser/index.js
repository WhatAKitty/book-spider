'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bqg = require('./bqg.parser');

var _bqg2 = _interopRequireDefault(_bqg);

var _ybdu = require('./ybdu.parser');

var _ybdu2 = _interopRequireDefault(_ybdu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bqgParser = new _bqg2.default();
var ybduParser = new _ybdu2.default();

exports.default = function (key) {
  if (!key || key === bqgParser.getKey()) return bqgParser;else if (key === ybduParser.getKey()) return ybduParser;else throw '\u4E0D\u5B58\u5728\u540D\u4E3A' + key + '\u7684\u56FE\u4E66\u89E3\u6790\u5668';
};
//# sourceMappingURL=index.js.map