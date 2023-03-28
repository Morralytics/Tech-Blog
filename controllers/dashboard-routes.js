const router = require('express').Router();
const { Post } = require('../models/Post');
const { id_auth } = require('../utils/helpers')

router.get('/', id_auth, async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    };
    console.log(req.session.loggedIn);
    res.render('dashboard', {
        loggedIn: req.session.loggedIn,
    });
})

router.get('/post', id_auth, async (req, res) => {
    res.render('post');
});

module.exports = router;