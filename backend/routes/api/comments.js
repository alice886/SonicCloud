const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');
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

router.get('/currentUser', validateLogin, async (req, res) => {
    const { user } = req;
    let userId;
    if (user) {
        userId = user.toSafeObject().id
    };
    const allComments = await Comment.findAll({
        where: {
            userId,
        }
    });
    res.json(allComments);
})


// router.get('/', restoreUser, (req, res) => {
//     const { user } = req;
//     if (user) {
//         return res.json({
//             await Comment.findAll({
//                 where: {
//                     id: user.toSafeObject().id
//                 }

//             }
//             )
//         });
//     } else return res.json({});
// })


module.exports = router;
