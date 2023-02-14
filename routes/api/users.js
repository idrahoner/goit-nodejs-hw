const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { usersSchema } = require('../../helpers');
const { usersCtrl } = require('../../controllers');

const router = express.Router();

router.post(
  '/register',
  validateBody(usersSchema.register),
  callController(usersCtrl.register)
);

router.post('/login', callController(usersCtrl.login));

router.post('/logout', callController(usersCtrl.logout));

module.exports = router;
