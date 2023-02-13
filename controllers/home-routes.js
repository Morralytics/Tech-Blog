const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;