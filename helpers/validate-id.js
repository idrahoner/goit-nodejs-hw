const mongoose = require('mongoose');
const { generateError } = require('./generate-error');
const { responseErrors } = require('./response-errors');

const validateId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw generateError(responseErrors.notFound);
  }
};

module.exports = {
  validateId,
};
