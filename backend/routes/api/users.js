const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.get('/', async (req, res) => {
    const allUsers = await User.findAll({
        where: {},
        include: [],
    });
    res.json(allUsers);
});

router.post('/signup', validateSignup, async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    const user = await User.signup({ username, firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({ user });
});


router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const theUser = await User.findByPk(userId);
    if (!theUser) res.status(404).send('User not found');
    res.json(theUser);
})











module.exports = router;
// module.exports = { validateSignup, validateLogin };
