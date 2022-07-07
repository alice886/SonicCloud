const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require('../../db/models');
// const { route } = require('./songs');

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

// getting all albums
router.get('/', validateLogin, async (req, res) => {
    const allAlbums = await Album.findAll({
        where: {},
        include: [],
    });
    res.json(allAlbums);
});

// getting albums created by current user

router.get('/myalbums', validateLogin, restoreUser, async (req, res) => {
    const { user } = req;
    if (user) {
        const myAlbums = await Album.findAll({
            where: {
                userId: user.dataValues.id,
            }
        })
        if (!myAlbums) return res.json('dont have a record of your album yet!')
        return res.json(myAlbums);
    } else {
        res.status(404);
        return res.json('user/user album not found');
    }
})
/*
// creating a new album

router.post('/albums', validateLogin, restoreUser, async (req, res) => {
    // const { userId } = User.scope('currentUser').findByPk(user.id);
    const { user } = req;
    const { name, previewImage } = req.body;
    if (!name) {
        throw new Error('please set a name for the new album');
    }
    console.log(user.dataValues.id)
    console.log(name)
    console.log(previewImage)
    // const newAlbum = await Album.create({
    //     name,
    //     userId: user.dataValues.id,
    //     previewImage,
    // })
    res.status(201);
    res.json('yay');
    // res.json(newAlbum);
})
*/
module.exports = router;
