const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth, authorizationRequire } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
  } = require("../../awsS3");

const createSongValidate = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Song title is required and must be 2 characters or more'),
    check('title')
        .custom(async function (title) {
            const existedTitle = await Song.findOne({ where: { title } })
            if (existedTitle) return Promise.reject('Plese choose another name')
        })
        .withMessage('Plese choose another name'),
    check('albumId')
        .exists({ checkFalsy: true })
        .withMessage('Please choose the designated album to proceed'),
    check('url')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Audio url is required and must be 4 characters or more'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Description is required and must be 2 characters or more'),
    handleValidationErrors
]
const editSongValidate = [
    check('albumId')
        .exists({ checkFalsy: true })
        .withMessage('Please choose the designated album to proceed'),
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Song title is required and must be 2 characters or more'),
    check('url')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Audio url is required and must be 4 characters or more'),
    handleValidationErrors
]


const songnotfound = {
    "message": "Song couldn't be found",
    "statusCode": 404
};


// Get all Songs
// DONE
router.get('/all', restoreUser, async (req, res) => {
    const allSongs = await Song.findAll({
        where: {},
        include: [],
    });
    // console.log('/all  -- testing')
    res.json(allSongs);
});



// Get all Songs created by the Current User
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


// Get details of a Song from an id
// DONE
router.get('/:songId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId, {
        include: [{ model: User, as: 'Artist' }, { model: Album }]
    });
    if (!theSong) {
        res.status(404);
        return res.send(songnotfound);
    }

    return res.json(theSong);
});


// Get all Comments by a Song's id
// DONE
router.get('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const thesongId = req.params.songId;
    console.log(thesongId)
    const allComments = await Comment.findAll({
        where: {
            songId: thesongId,
        }
    })
    if (!allComments.length) {
        res.status(404);
        return res.send(songnotfound);
    }
    return res.json(allComments)
})


// Create a Comment for a Song based on the Song's id
// DONE
router.post('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const { body } = req.body
    const thesong = await Song.findByPk(songId);
    if (!body) return res.status(400).json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
            "body": "Comment body text is required"
        }
    });
    if (!thesong) {
        res.status(404);
        return res.send(songnotfound);
    }
    let newComment = await Comment.create({
        userId,
        songId,
        body,
    })
    return res.json(newComment)

})



// Edit a Song
// DONE
router.put('/mysongs', restoreUser, requireAuth, editSongValidate, async (req, res, next) => {

    const userId = req.user.id;
    const { id, albumId, title, description, url, previewImage } = req.body

    // if (!id) return res.json('please specify the song id to proceed')
    // if (!title || !url) {
    //     res.status(400);
    //     return res.send({
    //         "message": "Validation Error",
    //         "statusCode": 400,
    //         "errors": {
    //             "title": "Song title is required"
    //         }
    //     });
    // }
    // if (!url) {
    //     res.status(400);
    //     return res.send({
    //         "message": "Validation Error",
    //         "statusCode": 400,
    //         "errors": {
    //             "url": "Audio is required"
    //         }
    //     });
    // }

    const thesong = await Song.findByPk(id)
    if (!thesong) return res.status(404).send({
        "message": "Song couldn't be found",
        "statusCode": 404
    }
    );
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
    res.status(201);
    return res.json(thesong)


    /*
    const userId = req.user.id;
    const { id, albumId, title, description, url, previewImage } = req.body
 
    if (!id) res.json('please specify the song id to proceed')
    const thesong = await Song.findByPk(id)
 
    console.log(thesong)
    if (userId !== thesong.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
 
    const e = new Error('Validation Error');
    // e.message = 'Validation Error';
    e.status = 400;
    e.errors = {};
    e.errors.title = "Song title is required";
    e.errors.url = "Audio is required";
    if (!title || !url) return res.send(e);
 
    const thatsong = await Song.findByPk(id);
    if (!thatsong) {
        res.status(404);
        res.json({ "message": "Song couldn't be found" })
    }
 
    if (albumId) { thesong.albumId = albumId; }
    if (title) { thesong.title = title; };
    if (description) { thesong.description = description; };
    if (url) { thesong.url = url; };
    if (previewImage) { thesong.previewImage = previewImage; };
 
    await thesong.save();
    return res.json(thesong)
*/
})

// Create a Song for an Album based on the Album's id
// DONE
// router.post('/mysongs/', restoreUser, singleMulterUpload("url"), requireAuth, createSongValidate, async (req, res, next) => {
router.post('/mysongs/', restoreUser, singleMulterUpload("url"), requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { albumId, title, description, previewImage } = req.body;
    // const { albumId, title, description, url, previewImage } = req.body;
    // const url = await singlePublicFileUpload(req.file);
    const url = 'https://soniccloud886.s3.amazonaws.com/%E8%88%92%E6%9B%BC%EF%BC%9A%E5%BF%AB%E4%B9%90%E7%9A%84%E5%86%9C%E5%A4%AB.mp3'

    // if (!title || !url) return res.send({
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {
    //         "title": "Song title is required",
    //         "url": "url is required"
    //     }
    // });

    const thealbum = await Album.findByPk(albumId);
    if (!thealbum) {
        const e = new Error("Album couldn't be found");
        e.title = "Album couldn't be found";
        e.status = 404;
        return res.send(e);
    }
    if (userId !== thealbum.userId) return next(authorizationRequire());
    let newSong = await Song.create({
        userId,
        albumId,
        title,
        description,
        url,
        previewImage
    })
    console.log('hello what is the url', url)
    res.status(201);
    return res.json(newSong);
})



// Delete a Song
// DONE
router.delete('/mysongs', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.body;
    const thesong = await Song.findByPk(id);

    if (!thesong) {
        res.status(404);
        return res.send(songnotfound);
    }
    if (thesong.userId !== userId) {
        return next(authorizationRequire());
    }

    await thesong.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });

})



// Add Query Filters to Get All Songs
// DONE
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

const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}

// router.get('/', restoreUser, requireAuth, validatePagination, async (req, res, next) => {
router.get('/', restoreUser, requireAuth, async (req, res, next) => {
    console.log('im the backend')
    const songs = await Song.findAll();

    let pagination = {};
    let { page, size } = req.query;

    page = page === undefined ? 0 : parseInt(page);
    size = size === undefined ? 20 : parseInt(size);

    if (size >= 1 && page >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }
    const paged = {};
    paged.songs = await Song.findAll({
        where: {},
        // include: [page, size],
        ...pagination
    });
    paged.page = page;
    paged.size = paged.songs.length;
    return res.json(paged);
});


module.exports = router;
