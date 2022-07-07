const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Song } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
// const { validateSignup, validateLogin } = require('../../routes/api/users');

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
    const allSongs = await Song.findAll({
        where: {},
        include: [],
    });
    res.json(allSongs);
});

router.get('/:songId',validateLogin, async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');

    return res.json(theSong);
});

router.delete(':/songId',validateLogin, async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');
    await Song.destroy({
        where: {
            id: songId
        }
    });
    return res.json({ message: 'Successfuly deleted' });
})

const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}

module.exports = router;
