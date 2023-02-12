const router = require('express').Router();
const { User } = require('../../models');

router.post('/',  async (req, res) => {
    try {
        const postData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(postData)
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;