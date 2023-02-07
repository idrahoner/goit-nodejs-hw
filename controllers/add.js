const { ContactModel } = require('../models');

const add = async (req, res) => {
  const newContact = await ContactModel.create(req.body);
  res.status(201).json(newContact);
};

module.exports = {
  add,
};
