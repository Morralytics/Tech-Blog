const router = require('express').Router();
const { User, Post } = require('../models');


// Sends to homepage
router.get('/', async (req, res) => {
    try {
        const postData = await User.findAll({
            include: [
                {
                    model: Post,
                },
            ],
        });

        const posts = postData.map((users) =>
        users.get({ plain: true })
        );
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