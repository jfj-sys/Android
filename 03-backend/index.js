// index.js
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. 引入cors
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // 优先使用环境变量中的端口

// --- 核心中间件 ---
// 2. 使用cors中间件 - 解决跨域问题
// 讲解：CORS (Cross-Origin Resource Sharing) 是一个必需的步骤。当我们的前端（比如运行在localhost:5173）
// 尝试请求后端（运行在localhost:3000）时，浏览器会出于安全策略阻止它。 
// `cors()` 中间件会自动添加必要的响应头，告诉浏览器“我允许那个地址的请求”，从而让前后端可以顺利通信。
app.use(cors());

// 3. 使用express.json()中间件 - 解析请求体
// 讲解：这个中间件让我们的Express应用能够识别并处理传入的JSON格式数据（比如用户注册时POST的用户名和密码）。
app.use(express.json());

// --- 数据库连接 ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API 路由 ---
// POST /api/register - 用户注册
app.post('/api/register', async (req, res) => {
    try {
        // 1. 从请求体中获取用户名、邮箱、密码
        const { username, email, password } = req.body;

        // 2. 检查用户或邮箱是否已存在
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // 3. 创建新用户实例
        user = new User({ username, email, password });

        // 4. 对密码进行哈希加密
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 5. 将新用户保存到数据库
        await user.save();

        // 6. 返回成功信息 (暂时不返回token)
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Feynman Platform backend is running at http://localhost:${port}`);
});


app.use(express.json());

// 使用路由文件
app.use('/api/users', require('./routes/users'));
app.use('/api/knowledge-points', require('./routes/knowledgePoints')); // 新增



