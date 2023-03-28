const router = require('express').Router();
const { Post } = require('../models');
const { id_auth } = require('../utils/helpers')

router.get('/', id_auth, async (req, res) => {
    const postData = await Post.findAll(
        { where: 
            { user_id: req.session.user_id }
        });
    const userPosts = postData.map((posts) => 
    posts.get({ plain: true })
    );

    res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        userPosts,
    });
})

router.get('/post', id_auth, async (req, res) => {
    res.render('post', {
        loggedIn: req.session.loggedIn,
    });
});

module.exports = router;