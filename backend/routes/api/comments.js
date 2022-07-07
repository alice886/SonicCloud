const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// getting my comments
// DONE
router.get('/mycomments', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const mycomments = await Comment.findAll({
            where: {
                userId: user.dataValues.id,
            }
        })
        return res.json(mycomments);
    } else {
        res.status(404);
        return res.json('user is not found');
    }
})






module.exports = router;
