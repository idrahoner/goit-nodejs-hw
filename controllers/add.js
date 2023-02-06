const { ContactModel } = require('../models');

const add = async (res, req) => {
  const newContact = await ContactModel.create(res.body);
  req.status(201).json(newContact);
};

module.exports = {
  add,
};
