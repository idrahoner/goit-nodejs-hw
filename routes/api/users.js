const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { usersSchema } = require('../../helpers');
const { usersCtrl } = require('../../controllers');
const { checkAuthUser } = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validateBody(usersSchema.register),
  callController(usersCtrl.register)
);

router.post(
  '/login',
  validateBody(usersSchema.login),
  callController(usersCtrl.login)
);

router.post('/logout', checkAuthUser, callController(usersCtrl.logout));

router.get('/current', checkAuthUser, callController(usersCtrl.current));

module.exports = router;
