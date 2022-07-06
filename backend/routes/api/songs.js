const express = require('express');
// const { HostNotFoundError } = require('sequelize/types');
const router = express.Router();

const { Song } = require('../../db/models');

router.get('/', async (req, res) => {
    const allSongs = await Song.findAll({
        where: {},
        include: [],
    });
    res.json(allSongs);
});

router.get('/:songId', async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');

    return res.json(theSong);
});

router.delete(':/songId', async (req, res) => {
    const { songId } = req.params;
    const theSong = await Song.findByPk(songId);
    if (!theSong) res.status(404).send('Song not found');
    await Song.destroy({
        where: {
            id: songId
        }
    });
    return res.json({ message: 'Successfuly deleted' });
})

const editSongHandler = async (req, res) => {
    const { songId } = req.params;
    const { userId, albumId, title, description, url, previewImae } = req.body;
}

module.exports = router;
