const router = require('express').Router();
const { User, Post } = require('../models');


// Sends to homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({});
        
        const posts = postData.map((posts) =>
        posts.get({ plain: true })
        );
        console.log(posts);
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

// Sends to login page
router.get('/login', (req, res) => {
    res.render('login')
});


module.exports = router;