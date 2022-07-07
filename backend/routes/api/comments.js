const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');


// getting all comments
// DONE
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const allComments = await Comment.findAll({
        where: {},
        include: [],
    });
    res.json(allComments);
});


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
        if (mycomments.length === 0) return res.json('you dont have any comments yet')
        return res.json(mycomments);
    } else {
        res.status(404);
        return res.json('user is not found');
    }
})


// edit a comment
// DONE
router.put('/mycomments', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { id, body } = req.body
    if (!body) return res.json('plz enter your comment')

    const thecomment = await Comment.findByPk(id)

    if (!thecomment) {
        res.status(404);
        return res.json('comment not found, plz try again')
    }

    thecomment.body = body;
    await thecomment.save();

    return res.json(thecomment)

})


// delete a comment
// DONE
router.delete('/mycomments', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.body;
    const thecomment = await Comment.findByPk(id)

    if (!id) { return res.json('please enter the comment id to proceed') };
    if (!thecomment) {
        res.status(404);
        return res.json('comment not found, plz try again')
    }
    if (thecomment.userId !== userId) {
        return res.send('you may only delete comments of yours')
    }

    await Comment.destroy({
        where: {
            id,
        }
    });
    return res.json('comment deleted');

})


module.exports = router;
