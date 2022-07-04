const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('hi albums');  // ok it works!!
})

module.exports = router;
