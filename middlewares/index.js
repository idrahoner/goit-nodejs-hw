const { globalHandleError } = require('./global-hanlde-error');
const { validateBody } = require('./validate-body');
const { callController } = require('./call-controller');

module.exports = {
  globalHandleError,
  validateBody,
  callController,
};
