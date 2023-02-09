const { contactsService } = require('../services');

const add = async (req, res) => {
  const newContact = await contactsService.addItem(req.body);
  res.status(201).json(newContact);
};

module.exports = {
  add,
};
