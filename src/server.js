const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 初始化Express
const app = express();
app.use(cors());
app.use(express.json()); // 替换body-parser

// 连接MongoDB（替换your-db-name）
mongoose.connect('mongodb://localhost:27017/test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB连接成功'))
.catch(err => console.error('MongoDB连接失败:', err));

// 创建用户模型
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 用户注册路由
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    
    const savedUser = await newUser.save();
    res.status(201).json({
      message: '用户创建成功',
      userId: savedUser._id
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: '该邮箱已被注册' });
    }
    res.status(500).json({ error: '服务器错误' });
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});