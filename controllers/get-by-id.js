const { contactsService } = require('../services');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getItemById(contactId);
  res.status(200).json(contact);
};

module.exports = {
  getById,
};
