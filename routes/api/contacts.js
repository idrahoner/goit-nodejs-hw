const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { validationSchema } = require('../../helpers');

const { contactsCtrl } = require('../../controllers');

const router = express.Router();

router.get('/', callController(contactsCtrl.getAll));

router.get('/:contactId', callController(contactsCtrl.getById));

router.post(
  '/',
  validateBody(validationSchema.add),
  callController(contactsCtrl.add)
);

router.delete('/:contactId', callController(contactsCtrl.remove));

router.put(
  '/:contactId',
  validateBody(validationSchema.update),
  callController(contactsCtrl.update)
);

router.patch(
  '/:contactId/favorite',
  validateBody(validationSchema.statusUpdate),
  callController(contactsCtrl.update)
);

module.exports = router;
