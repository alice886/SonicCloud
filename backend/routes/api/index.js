// backend/routes/api/index.js
const router = require('express').Router();

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
})



//{"XSRF-Token":"WrrIzk3h-XAUiLTIoZ2FB7qs5741RDiPA2wk"}













module.exports = router;
