const express = require('express');

const validateBody = require('../../middlewares/validation');
const validateSchema = require('../../utils/validation');
const contactsCtrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', contactsCtrl.getAll);

router.get('/:contactId', contactsCtrl.get);

router.post('/', validateBody(validateSchema.schemaAdd), contactsCtrl.add);

router.delete('/:contactId', contactsCtrl.remove);

router.put(
  '/:contactId',
  validateBody(validateSchema.schemaAdd),
  contactsCtrl.update
);

module.exports = router;
