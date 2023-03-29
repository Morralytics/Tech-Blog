const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Gets all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a user
// This is ran from the signup section of the form which creates a brand new user and saves their session information
router.post('/', async (req, res) => {
    try {
        const postData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = postData.id;
            req.session.username = postData.username;
            res.status(200).json(postData)
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Deletes a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(400).json(err);
    };
});

// Login 
// This is ran from the login section of the form which finds a user and saves their session information
router.post('/login', async (req, res) => {
    try {
        const userLoginData = await User.findOne({ where: { email: req.body.email } });

        if (!userLoginData) {
            res.status(400).json({ msg: 'Try again, incorrect password or username' });
            return;
        }

        const correctPassword = await userLoginData.checkPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ msg: 'Try again, incorrect password or username' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userLoginData.id;
            req.session.username = userLoginData.username;
            res.status(200).json({ user: userLoginData, msg: 'You are logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;