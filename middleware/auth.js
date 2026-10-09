// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. 从 Authorization 请求头中获取token
    const authHeader = req.header('Authorization');

    // 2. 检查token是否存在
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // 401: 未授权
    }

    // 兼容 "Bearer <token>" 和 "<token>" 两种写法
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    // 3. 验证token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 将解码后的用户信息（特别是user.id）附加到请求对象上
        req.user = decoded.user;

        // 调用next()，将控制权交给下一个中间件或路由处理器
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
