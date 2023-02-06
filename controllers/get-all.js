const { ContactModel } = require('../models');

const getAll = async (req, res) => {
  const contacts = await ContactModel.find({});
  res.status(200).json(contacts);
};

module.exports = {
  getAll,
};
