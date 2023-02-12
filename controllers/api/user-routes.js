const router = require('express').Router();
const { User } = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const postData = await User.create();
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;