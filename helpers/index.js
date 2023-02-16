const contactsSchema = require('./validation/contacts');
const usersSchema = require('./validation/users');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');
const { validateId } = require('./validate-id');
const { renameIdField } = require('./rename-id-field');
const { calculatePagination } = require('./calculate-pagination');
const constants = require('./constants');

module.exports = {
  contactsSchema,
  usersSchema,
  generateError,
  responseErrors,
  validateId,
  renameIdField,
  calculatePagination,
  constants,
};
