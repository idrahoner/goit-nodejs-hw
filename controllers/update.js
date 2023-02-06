const { ContactModel } = require('../models');
const { validateId } = require('../helpers');

const update = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const updatedContact = await ContactModel.updateOne(contactId, req.body);
  console.log('updated contact: ', updatedContact);
  res.status(200).json(updatedContact);
};

module.exports = {
  update,
};
