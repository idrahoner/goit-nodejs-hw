const express = require('express');

const { validateBody } = require('../../middlewares');
const { validationSchema, callController } = require('../../helpers');
const contactsCtrl = require('../../controllers/contacts-controllers');

const router = express.Router();

router.get('/', callController(contactsCtrl.getAll));

router.get('/:contactId', callController(contactsCtrl.get));

router.post(
  '/',
  validateBody(validationSchema.add),
  callController(contactsCtrl.add)
);

router.delete('/:contactId', callController(contactsCtrl.remove));

router.put(
  '/:contactId',
  validateBody(validationSchema.add),
  contactsCtrl.update
);

module.exports = router;
