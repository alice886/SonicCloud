const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth, authorizationRequire } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, playlistSong } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please provide a username with at least 3 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// getting all users
// DONE
router.get('/', async (req, res) => {
    const allUsers = await User.findAll({
        where: {},
        include: [],
    });
    res.json(allUsers);
});

// getting details of an artist from an id
// getting only those who registered as artists
// DONE
router.get('/artists/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const allArtists = await User.findAll({
        where: {
            isAnArtist: true,
            id: artistId,

        },
        include: [Album, Song, Playlist]
    });
    res.json({ allArtists });
});

// signing up 
// DONE
router.post('/signup', validateSignup, async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    const user = await User.signup({ username, firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({ user });
});

// getting details for a specific user base on Id
// DONE
router.get('/:userId(\\d+)', restoreUser, requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const theUser = await User.findByPk(userId);
    if (!theUser) res.status(404).send('User not found');
    res.json({ theUser });
})


// getting all songs of a an artist base on Id
// DONE
router.get('/artists/:artistId/songs', restoreUser, requireAuth, async (req, res, next) => {
    const artistId = req.params.artistId;
    const theArtist = await User.findAll({
        where: {
            id: artistId,
            isAnArtist: true
        }
    });
    if (!theArtist.length) return res.send('user not found / the user is not an artist')

    const artistSongs = await Song.findAll({
        where: {
            userId: artistId
        }
    })
    if (!artistSongs) res.status(404).send('no songs found');
    res.json({ artistSongs });
})


// getting all albums of a an artist base on Id
// DONE
router.get('/artists/:artistId/albums', restoreUser, requireAuth, async (req, res, next) => {
    const artistId = req.params.artistId;
    const theArtist = await User.findAll({
        where: {
            id: artistId,
            isAnArtist: true
        }
    });
    if (!theArtist.length) return res.send('user not found / the user is not an artist')

    const artistAlbums = await Album.findAll({
        where: {
            userId: artistId
        }
    })
    if (!artistAlbums) res.status(404).send('no albums found');
    res.json({ artistAlbums });
})


// getting all playlists of a an artist base on Id
// DONE
router.get('/artists/:artistId/playlists', restoreUser, requireAuth, async (req, res, next) => {
    const artistId = req.params.artistId;
    const theArtist = await User.findAll({
        where: {
            id: artistId,
            isAnArtist: true
        }
    });
    if (!theArtist.length) return res.send('user not found / the user is not an artist')

    const artistPlaylists = await Playlist.findAll({
        where: {
            userId: artistId
        },
    })
    if (!artistPlaylists) res.status(404).send('no playlists found');
    res.json({ artistPlaylists });
})









module.exports = router;
// module.exports = { validateSignup, validateLogin };
