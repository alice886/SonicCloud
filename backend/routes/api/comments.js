const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('hi comments');  // ok it works!!
})

module.exports = router;
