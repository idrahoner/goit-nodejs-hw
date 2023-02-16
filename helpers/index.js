const { contactsSchema, usersSchema } = require('./validation');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');
const { validateId } = require('./validate-id');
const { renameIdField } = require('./rename-id-field');
const { calculatePagination } = require('./calculate-pagination');

module.exports = {
  contactsSchema,
  usersSchema,
  generateError,
  responseErrors,
  validateId,
  renameIdField,
  calculatePagination,
};
