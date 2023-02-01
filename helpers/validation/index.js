const { schemaAdd } = require('./validation-schema-add');
const { schemaUpdate } = require('./validation-schema-update');

const validationSchema = {
  add: schemaAdd,
  update: schemaUpdate,
};

module.exports = { validationSchema };
