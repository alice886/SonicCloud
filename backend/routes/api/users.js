const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please provide a username with at least 3 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]


router.post('/', validateSignup, async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
        const user = await User.signup({ username, firstName, lastName, email, password });

        await setTokenCookie(res, user);

        return res.json({ user });
    } catch (err) {
        if (await User.findAllByUsername(username)) {
            const err = new Error('username already exists');
            err.title = 'username already exists';
            err.errors = ['username already exists'];
            err.status = 422;
            return next(err);
        }
    }
});

router.get('/current', async (req, res) => {
    try {
        const { id, username, email } = await User.toSafeObject();
        return res.json(User.getCurrentUserById(id));
    } catch (e) {
        const err = new Error('could not find current user');
        err.title = 'could not find current user';
        err.errors = ['could not find current user'];
        err.status = 404;
        return next(err);
    }

})











module.exports = router;
