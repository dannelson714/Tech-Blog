const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req,res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.password,
            posting_date: req.body.date,
            user_id: req.session.currentUser,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});




