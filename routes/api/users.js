const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { usersSchema } = require('../../helpers');
const { usersCtrl } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

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

router.post('/logout', authMiddleware, callController(usersCtrl.logout));

router.get('/current', authMiddleware, callController(usersCtrl.current));

router.patch(
  '/',
  authMiddleware,
  validateBody(usersSchema.updateSubscription),
  callController(usersCtrl.updateSubscription)
);

module.exports = router;
