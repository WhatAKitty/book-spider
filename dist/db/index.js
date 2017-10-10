'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.db = undefined;

var _mongodbConnectionPool = require('./mongodb-connection-pool');

var _mongodbConnectionPool2 = _interopRequireDefault(_mongodbConnectionPool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.db = _mongodbConnectionPool2.default;
exports.init = _mongodbConnectionPool.init;
//# sourceMappingURL=index.js.map