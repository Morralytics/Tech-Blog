const router = require('express').Router();
const { User, Post } = require('../../models');

// Gets all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: {
                model: Post,
            }
        });
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a user
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

module.exports = router;