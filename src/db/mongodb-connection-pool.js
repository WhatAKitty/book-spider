import MongoDB from 'mongodb';

const MongoClient = MongoDB.MongoClient;

let db;

export const init = (callback) => {
  console.log('start init db');
  // Initialize connection once
  MongoClient.connect("mongodb://localhost:27017/book-spider", (err, database) => {
    console.log('finish init')
    if (err) throw err;

    db = database;
console.log('db inited: ', db);
    callback();
  });
}

export default () => {
  if (!db) throw '请先初始化数据库连接';
  return db;
};
