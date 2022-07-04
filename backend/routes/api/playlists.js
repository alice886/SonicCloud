const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('hi playlists');  // ok it works!!
})

module.exports = router;
