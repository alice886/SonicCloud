const express = require('express');
const router = express.Router();

const { Album } = require('../../db/models');

router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll({
        where: {},
        include: [],
    });
    res.json(allAlbums);
});

router.post('/', async (req, res) => {
    // const { userId } = User.scope('currentUser').findByPk(user.id);
    const { name, previewImage } = req.body;
    const userId = 5;
    // const albumName = await Album.findByName(name);
    // if (albumName) throw new Error('Album name already exists.')

    let newAlbum = await Album.create({
        name,
        userId,
        previewImage,
    })
    res.status(201);
    res.json(newAlbum);
})

module.exports = router;
