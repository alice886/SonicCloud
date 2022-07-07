const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Playlist } = require('../../db/models');

router.get('/', async (req, res) => {
    const allPlaylist = await Playlist.findAll({
        where: {},
        include: [],
    });
    res.json(allPlaylist);
});

module.exports = router;
