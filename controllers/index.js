const { getAll } = require('./get-all');
const { getById } = require('./get-by-id');
const { add } = require('./add');
const { remove } = require('./remove');
const { update } = require('./update');

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
