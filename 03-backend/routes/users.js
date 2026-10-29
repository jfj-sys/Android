// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // 引入加密库
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- 用户注册 API (已集成密码加密) ---
// @route   POST /api/users/register
// @desc    注册一个新用户
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. 检查用户是否已存在
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. 创建新用户实例
        user = new User({
            username,
            email,
            password
        });

        // 3. 【安全核心】对密码进行哈希加密
        // 讲解：我们使用 bcrypt 库。它会先生成一个“盐”（salt），这是一个随机字符串，
        // 然后将盐和原始密码混合在一起进行哈希计算。
        // 这样做可以确保即使两个用户设置了相同的密码，它们在数据库中的哈希值也完全不同。
        const salt = await bcrypt.genSalt(10); // 10是安全强度，数值越大越安全但越耗时
        user.password = await bcrypt.hash(password, salt); // 生成加密后的密码

        // 4. 保存用户到数据库
        await user.save();

        // 5. 注册成功，直接生成JWT并返回，实现注册后自动登录
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- 用户登录 API ---
// @route   POST /api/users/login
// @desc    用户登录并获取token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. 检查用户是否存在
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. 【安全核心】比较密码
        // 这里使用 bcrypt.compare 来安全地比较客户端传来的原始密码和数据库中存储的哈希密码。
        // 它会自动处理盐值，我们无需关心。只有密码匹配，才会返回true。
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. 登录成功，生成JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
