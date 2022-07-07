const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth, authorizationRequire } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// getting all users
// DONE
// router.get('/', async (req, res) => {
//     const allUsers = await User.findAll({
//         where: {},
//         include: [],
//     });
//     res.json(allUsers);
// });

// paging all users
// 

const validatePagination = (req, res, next) => {
    const { page, size } = req.query;
    const e = new Error('Validation Error');
    e.status = 400;
    e.errors = {};
    e.errors.page = "Page must be greater than or equal to 0";
    e.errors.size = "Size must be greater than or equal to 0";
    e.errors.createAt = "CreatedAt is invalid";

    if (parseInt(page) < 0 && parseInt(page) < 0) return next(e);
    return next();
}


router.get('/', restoreUser, requireAuth, validatePagination, async (req, res, next) => {
    let pagination = {};
    let { page, size } = req.query;

    page = page === undefined ? 0 : parseInt(page);
    size = size === undefined ? 20 : parseInt(size);

    if (size >= 1 && page >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const paged = await Song.findAll({
        where: {},
        // include: [page, size],
        ...pagination
    });


    return res.json(paged);
});

// getting songs created by current user
// DONE
router.get('/mysongs', restoreUser, requireAuth, async (req, res) => {
    const currentuserId = req.user.id;
    const mySongs = await Song.findAll({
        where: {
            userId: currentuserId,
        }
    })
    if (!mySongs) {
        res.status(404);
        return res.json('dont have a record of your song yet!')
    }
    return res.json(mySongs);


})


// getting a song by it's id
// DONE
router.get('/:songId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');

    return res.json(theSong);
});



// deleting a song
// DONE
router.delete('/:songId(\\d+)', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const songId = req.params.songId;
    const thesong = await Song.findByPk(songId);

    if (!thesong) {
        res.status(404);
        return res.json('song not found, please try again')
    }
    if (thesong.userId !== userId) {
        return next(authorizationRequire());
    }

    await thesong.destroy();
    return res.json('song deleted');

})

// getting all comments by a song's ID
// DONE
router.get('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const thesongId = req.params.songId;

    const allComments = await Comment.findAll({
        where: {
            songId: thesongId,
        }
    })
    if (!allComments) res.json('song not found, plz try again')
    return res.json({ allComments })

})

// creating a comment for a song based on song's id
// DONE
router.post('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const { body } = req.body
    const newComment = await Comment.create({
        userId,
        songId,
        body,
    })
    const thesongtobecommented = await Song.findByPk(songId);
    if (!thesongtobecommented) {
        res.status(404);
        return res.json('song not found, plz try again')
    }
    return res.json({ newComment })

})

// editing a song
// DONE
router.put('/mysongs', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id, albumId, title, description, url, previewImage } = req.body

    if (!id) res.json('please specify the song id to proceed')
    const thesong = await Song.findByPk(id)

    if (userId !== thesong.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
    if (albumId) { thesong.albumId = albumId; }
    if (title) { thesong.title = title; };
    if (description) { thesong.description = description; };
    if (url) { thesong.url = url; };
    if (previewImage) { thesong.previewImage = previewImage; };

    await thesong.save();
    return res.json({ thesong })

})


const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}





module.exports = router;
