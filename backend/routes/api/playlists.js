const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth, authorizationRequire } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, playlistSong } = require('../../db/models');


// getting all Playlists
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allPlaylist = await Playlist.findAll({
        where: {},
        include: [],
    });
    res.json({ allPlaylist });
});

// getting details of a playlist from an ID
// DONE
router.get('/:playlistId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const theplaylistId = req.params.playlistId;
    const thatPlaylist = await Playlist.findByPk(theplaylistId);
    if (!thatPlaylist) res.status(404).send('playlist does not exist')
    res.json({ thatPlaylist });
});



// getting only my playlist
// DONE
router.get('/myplaylists', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const myplaylists = await Playlist.findAll({
            where: {
                userId: user.dataValues.id,
            },
            include: Song
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
    return res.json({ newPlaylist });
})

// delete a playlist
// DONE
router.delete('/myplaylists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.body;
    const theplaylist = await Playlist.findByPk(id)

    if (!id) { return res.json('please enter the playlist id to proceed') };
    if (!theplaylist) {
        res.status(404);
        return res.json('playlist not found, please try again')
    }
    if (theplaylist.userId !== userId) {
        return next(authorizationRequire());
    }

    await Playlist.destroy({
        where: {
            id,
        }
    });
    return res.json('playlist deleted');

})

// edit an playlist
// DONE
router.put('/myplaylists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id, name, previewImage } = req.body

    if (!id) res.json('please specify the playlist id to proceed')
    const theplaylist = await Playlist.findByPk(id)

    if (userId !== theplaylist.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
    if (name) { theplaylist.name = name; };
    if (previewImage) { thealbum.previewImage = previewImage; };

    await theplaylist.save();
    return res.json({ theplaylist })

})

// adding a song to playlist based on the playlist's id
// DONE
router.post('/myplaylists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { songId, playlistId } = req.body

    if (!playlistId) res.json('please specify the playlist id to proceed')
    const theplaylist = await Playlist.findByPk(playlistId);
    const thesong = await Song.findByPk(songId);

    if (!thesong) return res.json('song does not exit')
    if (userId !== theplaylist.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
    const songtoPlaylist = await playlistSong.create({
        songId,
        playlistId
    })

    await songtoPlaylist.save();
    return res.json({ songtoPlaylist })
})

module.exports = router;
