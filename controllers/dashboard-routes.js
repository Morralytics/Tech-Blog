const router = require('express').Router();
const { Post, User } = require('../models');
const { id_auth } = require('../utils/helpers')

router.get('/', id_auth, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.session.user_id },
    })
    const userInfo = user.get({ plain: true });

    const postData = await Post.findAll(
        {
            where: { user_id: req.session.user_id },
        });
    const userPosts = postData.map((posts) =>
        posts.get({ plain: true })
    );

    res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        userPosts,
        userInfo,
    });
})

router.get('/post', id_auth, async (req, res) => {
    res.render('post', {
        loggedIn: req.session.loggedIn,
    });
});

router.get('/edit/:id', id_auth, async (req, res) => {
    const post = await Post.findOne({
        where: { id: req.params.id },
    })
    const postData = post.get({ plain: true });

    res.render('edit-post', {
        loggedIn: req.session.loggedIn,
        postData,
    });
});

module.exports = router;