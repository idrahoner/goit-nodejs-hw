const { contactsSchema, usersSchema } = require('./validation');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');
const { validateId } = require('./validate-id');
const { renameIdField } = require('./rename-id-field');

module.exports = {
  contactsSchema,
  usersSchema,
  generateError,
  responseErrors,
  validateId,
  renameIdField,
};
