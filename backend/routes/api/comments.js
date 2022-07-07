const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Comment, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please login for viewing songs'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a correct password.'),
    handleValidationErrors
];

router.get('/mycomments', validateLogin, restoreUser, async (req, res) => {
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
