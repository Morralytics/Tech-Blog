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

// Sends to single post page
router.get('/post/:id', id_auth, async (req, res) => {
    const post = await Post.findOne({
        where: { id: req.params.id },
        include: [ 
            User,
            {
                model: Comment,
                include: [User]
            },
        ],
    })
    const postData = post.get({ plain: true });

    res.render('single-post', {
        loggedIn: req.session.loggedIn,
        postData,
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    };
    res.render('login');
});

module.exports = router;