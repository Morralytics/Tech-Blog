const router = require('express').Router();
const { Post } = require('../../models');
const { id_auth } = require('../../utils/helpers');

// Gets all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a post
router.post('/', id_auth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body, user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Edits a post
router.put('/:id', id_auth, async (req, res) => {
    try {
        await Post.update({ ...req.body }, {
            where: {
                id: req.params.id,
            },
        });
        res.send('/dashboard')
    } catch (err) {
        res.status(400).json(err)
    }
});

// Deletes a post
router.delete('/:id', id_auth, async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.send('/dashboard')
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;