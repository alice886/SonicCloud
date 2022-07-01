// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');


router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});




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

/*
phase 3 - Test User Auth Middlewares
// - setTokenCookie
--> http://localhost:8000/api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'elmo'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});
// - restoreUser
--> http://localhost:8000/api/restore-user
router.use(restoreUser)
router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});
// - requireAuth
--> http://localhost:8000/api/require-auth
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'elmo'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.use(restoreUser);
router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});
*/

module.exports = router;
