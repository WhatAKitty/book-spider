'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

var db = void 0;

var init = exports.init = function init(callback) {
  console.log('start init db');
  // Initialize connection once
  MongoClient.connect("mongodb://localhost:27017/book-spider", function (err, database) {
    console.log('finish init');
    if (err) throw err;

    db = database;
    console.log('db inited: ', db);
    callback();
  });
};

exports.default = function () {
  if (!db) throw '请先初始化数据库连接';
  return db;
};
//# sourceMappingURL=mongodb-connection-pool.js.map