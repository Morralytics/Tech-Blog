const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Sends to homepage
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({});
        const user = userData.map((users) =>
            users.get({ plain: true })
        );

        const postData = await Post.findAll({});
        const userPosts = postData.map((posts) =>
            posts.get({ plain: true })
        );

        res.render('homepage', {
            user,
            userPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    };
    res.render('login');
});

module.exports = router;