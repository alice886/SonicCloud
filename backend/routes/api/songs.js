const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
// const { validateSignup, validateLogin } = require('../../routes/api/users');


// getting all songs
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allSongs = await Song.findAll({
        where: {},
        include: [],
    });
    return res.json(allSongs);
});

// getting a song by it's id
// DONE
router.get('/:songId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');

    return res.json(theSong);
});



// deleting a song
router.delete(':/songId(\\d+)', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    const theSong = await Song.findAll({
        where: {
            id: user.dataValues.id,
        }
    })

    if (theSong) {
        await Song.destory({
            where: {
                id: songId
            }
        })
        return res.json('song deleted');
    } else return res.json({});
    // const { songId } = req.params;

    // if (!theSong) res.status(404).send('Song not found');
    // if (theSong.userId === user.dataValues.id) {
    //     await Song.destroy({
    //         where: {
    //             id: songId
    //         }
    //     });
    //     return res.json({ message: 'Successfuly deleted' });
    // } else return res.json('you could only edit songs created by you')

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


// edit a comment
// DONE
router.put('/mycomments', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { songId, body } = req.body
    const editComment = await Comment.create({
        userId,
        songId,
        body,
    })
    const thesongtobecommented = await Song.findByPk(songId);
    if (!thesongtobecommented) {
        res.status(404);
        return res.json('song not found, plz try again')
    }
    return res.json(editComment)

})



const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}

module.exports = router;
