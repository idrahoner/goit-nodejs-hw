const express = require('express');

const { validateBody } = require('../../middlewares');
const { validationSchema, callController } = require('../../helpers');

const ctrlContacts = require('../../controllers');

const router = express.Router();

router.get('/', callController(ctrlContacts.getAll));

router.get('/:contactId', callController(ctrlContacts.getById));

router.post(
  '/',
  validateBody(validationSchema.add),
  callController(ctrlContacts.add)
);

router.delete('/:contactId', callController(ctrlContacts.remove));

router.put(
  '/:contactId',
  validateBody(validationSchema.update),
  callController(ctrlContacts.update)
);

router.patch(
  '/:contactId/favorite',
  validateBody(validationSchema.statusUpdate),
  callController(ctrlContacts.update)
);

module.exports = router;
