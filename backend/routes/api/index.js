// backend/routes/api/index.js
const router = require('express').Router();

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


//{"XSRF-Token":"WrrIzk3h-XAUiLTIoZ2FB7qs5741RDiPA2wk"}

/*
phase 1 - Test the API Router
--> http://localhost:8000/api/csrf/restore
fetch('/api/test', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": "oq1xt43l-jq_UTuQpCWFOneEa9YqT9M-4vxY"
    },
    body: JSON.stringify({ hello: 'world' })
  }).then(res => res.json()).then(data => console.log(data));

*/







module.exports = router;
