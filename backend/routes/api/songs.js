const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');


// getting all songs
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allSongs = await Song.findAll({
        where: {},
        include: [],
    });
    return res.json(allSongs);
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
// 
router.delete('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.body;
    const thesong = await Song.findByPk(id);

    if (!id) { return res.json('please enter the song id to proceed') };
    if (!thesong) {
        res.status(404);
        return res.json('song not found, please try again')
    }
    if (thesong.userId !== userId) {
        return res.send('you may only delete songs of yours')
    }

    await thesong.destroy()
    // await Song.destroy({
    //     where: {
    //         id,
    //     }
    // });
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
    return res.json(allComments)

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
    return res.json(newComment)

})

// edit a song
// DONE
router.put('/mysongs', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { id, albumId, title, description, url, previewImage } = req.body

    if (!id) res.json('please specify the song id to proceed')
    const thesong = await Song.findByPk(id)

    if (userId !== thesong.userId) {
        res.status(404);
        return res.json('you many only modify songs of yours')
    }
    if (albumId) { thesong.albumId = albumId; }
    if (title) { thesong.title = title; };
    if (description) { thesong.description = description; };
    if (url) { thesong.url = url; };
    if (previewImage) { thesong.previewImage = previewImage; };

    await thesong.save();
    return res.json(thesong)

})




const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}

module.exports = router;
