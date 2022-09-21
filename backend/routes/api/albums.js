const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth, authorizationRequire } = require('../../utils/auth');
const { User, Song, Artist, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const AlbumValidate = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Album name is required and must be 2 characters or more'),
    check('name')
        .custom(async function (name) {
            const existedName = await Album.findOne({ where: { name } })
            if (existedName) return Promise.reject('Plese choose another name')
        })
        .withMessage('Plese choose another name'),
    handleValidationErrors
]

// Create a Song for an Album based on the Album's id
// DONE
// router.post('/:albumId(\\d+)', restoreUser, requireAuth, async (req, res, next) => {
//     const userId = req.user.id;
//     const albumId = req.params.albumId;
//     const { title, description, url, previewImage } = req.body;
//     const e = new Error('Validation Error');
//     e.status = 400;
//     e.errors = {};
//     e.errors.title = "Song title is required";
//     e.errors.url = "Audio is required";

//     if (!title || !url) return res.send(e);

//     const thealbum = await Album.findByPk(albumId);
//     if (!thealbum) {
//         const e = new Error("Album couldn't be found");
//         e.title = "Album couldn't be found";
//         e.status = 404;
//         return res.send(e);
//     }
//     if (userId !== thealbum.userId) return next(authorizationRequire());
//     let newSong = await Song.create({
//         userId,
//         albumId,
//         title,
//         description,
//         url,
//         previewImage
//     })
//     res.status(201);
//     return res.json(newSong);
// })


// Get details of an Album from an id
// DONE
router.get('/:albumId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const thealbumId = req.params.albumId;
    // console.log('backend album id', thealbumId);
    const album = await Album.findByPk(thealbumId, {
        include: [{ model: User, as: 'Artist' }, { model: Song }]
    });
    // const albumdetails = await Album.findAll({
    //     where: {
    //         id: thealbumId
    //     },
    //     include: [
    //         { model: User, as: 'Artist' }, { model: Song }
    //     ],
    // })
    if (!album) res.status(404).send('album does not exist');
    res.json(album);
});

// Get all Albums
// DONE
router.get('/', restoreUser, async (req, res) => {
    const allAlbums = await Album.findAll({
        where: {},
        include: [{ model: User, as: 'Artist' }, { model: Song }],
    });
    res.json(allAlbums);
});

// Get all Albums created by the Current User
// DONE
router.get('/myalbums', restoreUser, requireAuth, async (req, res) => {
    const currentuserId = req.user.id;
    const myAlbums = await Album.findAll({
        where: {
            userId: currentuserId,
        },
        include: [{ model: User, as: 'Artist' }, { model: Song }]
        // include: Song
    })
    if (!myAlbums) {
        res.status(404);
        return res.json('dont have a record of your album yet!')
    }
    return res.json(myAlbums);
})


// Create an Album
// DONE
router.post('/myalbums', restoreUser, requireAuth, AlbumValidate, async (req, res) => {
    const userId = req.user.id;
    const { name, previewImage } = req.body;
    // if (name === undefined) {
    //     const e = new Error("Album title is required");
    //     e.title = "Album title is required";
    //     e.status = 404;
    //     return res.send(e);

    // res.status(400);
    // return res.send({
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {
    //         "title": "Album title is required"
    //     }
    // });
    // }
    let newAlbum = await Album.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    return res.json(newAlbum);
})



// Edit an Album
// DONE
router.put('/myalbums', restoreUser, requireAuth, AlbumValidate, async (req, res, next) => {
    const userId = req.user.id;
    const { id, name, previewImage } = req.body

    if (!id) res.json('please specify the album id to proceed')
    // if (name === undefined) return res.status(400).send({
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {
    //         "title": "Album title is required"
    //     }
    // }
    // );
    const thealbum = await Album.findByPk(id)
    if (!thealbum) return res.status(404).send({
        "message": "Album couldn't be found",
        "statusCode": 404
    }
    );
    if (userId !== thealbum.userId) {
        return next(authorizationRequire());
    }
    if (name) { thealbum.name = name; };
    if (previewImage) { thealbum.previewImage = previewImage; };

    await thealbum.save();
    return res.json({ thealbum })

})



// Delete an Album
// DONE
router.delete('/myalbums', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.body;
    const thealbum = await Album.findByPk(id)

    if (!thealbum) return res.status(404).send({
        "message": "Album couldn't be found",
        "statusCode": 404
    });
    if (thealbum.userId !== userId) {
        return next(authorizationRequire());
    }

    await thealbum.destroy();
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

})


module.exports = router;
