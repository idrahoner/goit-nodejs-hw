const express = require('express');

const { validateBody } = require('../../middlewares');
const { validationSchema, callController } = require('../../helpers');
const contactsCtrl = require('../../controllers/contacts-controllers');

const ctrlContacts = require('../../controllers');

const router = express.Router();

router.get('/', callController(ctrlContacts.getAll));

router.get('/:contactId', callController(ctrlContacts.getById));

router.post(
  '/',
  validateBody(validationSchema.add),
  callController(ctrlContacts.add)
);

router.delete('/:contactId', callController(contactsCtrl.remove));

router.put(
  '/:contactId',
  validateBody(validationSchema.update),
  contactsCtrl.update
);

module.exports = router;
