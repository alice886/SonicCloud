const express = require('express');
const router = express.Router();

const { Playlist } = require('../../db/models');

router.get('/', async (req, res) => {
    const allPlaylist = await Playlist.findAll({
        where: {},
        include: [],
    });
    res.json(allPlaylist);
});

module.exports = router;
