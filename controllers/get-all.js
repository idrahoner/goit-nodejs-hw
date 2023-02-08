const { ContactModel } = require('../models');
const { prepareResponse } = require('../helpers');

const getAll = async (req, res) => {
  const contacts = await ContactModel.find({});
  const preparedContacts = contacts.map((contact) => prepareResponse(contact));
  res.status(200).json(preparedContacts);
};

module.exports = {
  getAll,
};
