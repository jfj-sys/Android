// routes/knowledgePoints.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 引入认证中间件
const KnowledgePoint = require('../models/KnowledgePoints');

// @route   POST /api/knowledge-points
// @desc    创建一个新的知识点
// @access  Private (需要登录)
router.post('/', auth, async (req, res) => { // 在这里使用auth中间件
    try {
        const { title, content } = req.body;
        const newKp = new KnowledgePoint({
            title,
            content,
            user: req.user.id // 从auth中间件附加的req.user中获取用户ID
        });
        const kp = await newKp.save();
        res.json(kp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/knowledge-points
// @desc    获取当前用户的所有知识点
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const kps = await KnowledgePoint.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(kps);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/knowledge-points/:id
// @desc    获取单个知识点详情
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const kp = await KnowledgePoint.findById(req.params.id);
        if (!kp) return res.status(404).json({ msg: 'Knowledge point not found' });

        // 确保是该用户自己的知识点
        if (kp.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(kp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT /api/knowledge-points/:id
// @desc    更新一个知识点
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let kp = await KnowledgePoint.findById(req.params.id);
        if (!kp) return res.status(404).json({ msg: 'Knowledge point not found' });
        // 确保是该用户自己的知识点
        if (kp.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        const { title, content, status, reviewList } = req.body;
        kp = await KnowledgePoint.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content, status, reviewList } },
            { new: true } // 返回更新后的文档
        );
        res.json(kp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/knowledge-points/:id
// @desc    删除一个知识点
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let kp = await KnowledgePoint.findById(req.params.id);
        if (!kp) return res.status(404).json({ msg: 'Knowledge point not found' });
        if (kp.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await KnowledgePoint.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Knowledge point removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
