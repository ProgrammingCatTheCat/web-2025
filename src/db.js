const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';  // MongoDB的连接URL

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db('test_db');  // 替换为你的数据库名称

  // 在这里添加你的数据库操作逻辑
  const collection = db.collection('users');  // 替换为你的集合名称

  // 插入一条数据
  const document = { name: 'John', age: 30 };
  collection.insertOne(document, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Data inserted');
  });

  client.close();  // 断开与数据库的连接
});