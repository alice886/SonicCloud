const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require('../../db/models');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please login for viewing songs'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a correct password.'),
    handleValidationErrors
];

router.get('/', validateLogin, async (req, res) => {
    const allAlbums = await Album.findAll({
        where: {},
        include: [],
    });
    res.json(allAlbums);
});

router.post('/',validateLogin, async (req, res) => {
    // const { userId } = User.scope('currentUser').findByPk(user.id);
    const { name, previewImage } = req.body;
    const userId = 5;
    // const albumName = await Album.findByName(name);
    // if (albumName) throw new Error('Album name already exists.')

    let newAlbum = await Album.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    res.json(newAlbum);
})

module.exports = router;
