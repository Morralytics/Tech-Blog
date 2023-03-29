const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { id_auth } = require('../utils/helpers')

// Sends to homepage
router.get('/', id_auth, async (req, res) => {
        const postData = await Post.findAll({
            include: User,
        });
        const posts = postData.map((posts) =>
            posts.get({ plain: true })
        );

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    }
);

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    };
    res.render('login');
});

module.exports = router;