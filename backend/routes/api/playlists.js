const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




// getting all Playlists
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allPlaylist = await Playlist.findAll({
        where: {},
        include: [],
    });
    res.json(allPlaylist);
});

// getting details of a playlist from an ID
// DONE
router.get('/:playlistId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const theplaylistId = req.params.playlistId;
    const thatPlaylist = await Playlist.findByPk(theplaylistId);
    if (!thatPlaylist) res.status(404).send('playlist does not exist')
    res.json(thatPlaylist);
});



// getting only my playlist
// DONE
router.get('/myplaylists', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const myplaylists = await Playlist.findAll({
            where: {
                userId: user.dataValues.id,
            }
        })
        return res.json(myplaylists);
    } else {
        res.status(404);
        return res.json('playlist not found');
    }
})

// creating a new playlist
// DONE
router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { name, previewImage } = req.body;
    if (!name) {
        const e = new Error('please set a name for the new playlist');
        res.status(400);
        return res.send(e);
    }
    let newPlaylist = await Playlist.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    return res.json(newPlaylist);
})







module.exports = router;
