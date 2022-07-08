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


// Create a Playlist
// DONE
router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { name, previewImage } = req.body;
    if (name === undefined) return res.status(404).json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "name": "Playlist name is required"
        }
    })
    let newPlaylist = await Playlist.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    return res.json({ newPlaylist });
})


// Add a Song to a Playlist based on the Playlists's id
// DONE
router.post('/myplaylists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { songId, playlistId } = req.body

    const theplaylist = await Playlist.findByPk(playlistId);
    if (!theplaylist) return res.status(404).json({
        "message": "Playlist couldn't be found",
        "statusCode": 404
    });
    const thesong = await Song.findByPk(songId);
    if (!thesong) return res.status(404).json({
        "message": "Song couldn't be found",
        "statusCode": 404
    });
    if (userId !== theplaylist.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
    const songtoPlaylist = await playlistSong.create({
        songId,
        playlistId
    })
    await songtoPlaylist.save();
    return res.json(songtoPlaylist)
})


// Get details of a Playlist from an id
// DONE
router.get('/:playlistId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const theplaylistId = req.params.playlistId;
    const thatPlaylist = await Playlist.findByPk(theplaylistId);
    if (!thatPlaylist) return res.status(404).json({
        "message": "Playlist couldn't be found",
        "statusCode": 404
    });
    // const thatPlaylistdetail = await Playlist.findAll({
    //     where: {
    //         playlistId: theplaylistId,
    //     },
    //     include: Song
    // });
    res.json(thatPlaylist);
});


// Edit a Playlist
// DONE
router.put('/myplaylists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { id, name, previewImage } = req.body

    if (!id) res.json('please specify the playlist id to proceed')
    const theplaylist = await Playlist.findByPk(id)
    if (!theplaylist) res.status(404).json({
        "message": "Playlist couldn't be found",
        "statusCode": 404
    });
    if (!name) res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "name": "Playlist name is required"
        }
    });
    if (userId !== theplaylist.userId) {
        res.status(404);
        return next(authorizationRequire());
    }
    if (name) { theplaylist.name = name; };
    if (previewImage) { thealbum.previewImage = previewImage; };

    await theplaylist.save();
    return res.json(theplaylist)
})


// Delete a Playlist
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


// Get all Playlists created by the Current User
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




module.exports = router;
