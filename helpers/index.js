const contactsSchema = require('./validation/contacts');
const usersSchema = require('./validation/users');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');
const { renameIdField } = require('./rename-id-field');
const { calculatePagination } = require('./calculate-pagination');
const { saveAvatarToStorage } = require('./save-avatar-to-storage');
const constants = require('./constants');

module.exports = {
  contactsSchema,
  usersSchema,
  generateError,
  responseErrors,
  renameIdField,
  calculatePagination,
  saveAvatarToStorage,
  constants,
};
