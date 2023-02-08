const { schemaAdd } = require('./validation-schema-add');
const { schemaUpdate } = require('./validation-schema-update');
const { schemaStatusUpdate } = require('./validation-schema-status-update');

const validationSchema = {
  add: schemaAdd,
  update: schemaUpdate,
  statusUpdate: schemaStatusUpdate,
};

module.exports = { validationSchema };
