const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { contactsSchema } = require('../../helpers');

const { contactsCtrl } = require('../../controllers');
const { checkAuthUser } = require('../../middlewares');

const router = express.Router();

router.use(checkAuthUser);

router.get('/', callController(contactsCtrl.getAll));

router.get('/:contactId', callController(contactsCtrl.getById));

router.post(
  '/',
  validateBody(contactsSchema.add),
  callController(contactsCtrl.add)
);

router.delete('/:contactId', callController(contactsCtrl.remove));

router.put(
  '/:contactId',
  validateBody(contactsSchema.update),
  callController(contactsCtrl.update)
);

router.patch(
  '/:contactId/favorite',
  validateBody(contactsSchema.updateStatus),
  callController(contactsCtrl.update)
);

module.exports = router;
