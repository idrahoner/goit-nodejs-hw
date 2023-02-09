const { contactsSchema } = require('./validation');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');
const { validateId } = require('./validate-id');
const { prepareResponse } = require('./prepare-response');

module.exports = {
  contactsSchema,
  generateError,
  responseErrors,
  validateId,
  prepareResponse,
};
