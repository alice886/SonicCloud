const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// getting details of an album from an ID
// DONE
router.get('/:albumId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const thealbumId = req.params.albumId;
    const thatAlbums = await Album.findByPk(thealbumId);
    if (!thatAlbums) res.status(404).send('album does not exist')
    res.json(thatAlbums);
});

// getting all albums
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allAlbums = await Album.findAll({
        where: {},
        include: [],
    });
    res.json(allAlbums);
});

// getting albums created by current user
// DONE
router.get('/myalbums', restoreUser, requireAuth, async (req, res) => {
    const currentuserId = req.user.id;
    const myAlbums = await Album.findAll({
        where: {
            userId: currentuserId,
        }
    })
    if (!myAlbums) {
        res.status(404);
        return res.json('dont have a record of your album yet!')
    }
    return res.json(myAlbums);


})

// creating a new album
// DONE
router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { name, previewImage } = req.body;
    if (!name) {
        const e = new Error('please set a name for the new album');
        res.status(400);
        return res.send(e);
    }
    let newAlbum = await Album.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    return res.json(newAlbum);
})






module.exports = router;
