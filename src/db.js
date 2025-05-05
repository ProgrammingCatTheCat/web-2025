const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://admin:admin@localhost:27017/mongo_vue?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 获取数据库连接对象
const db = mongoose.connection;

// 监听连接成功的事件
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// 监听连接失败的事件
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// 导出数据库连接模块
module.exports = db;