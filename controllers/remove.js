const { contactsService } = require('../services');

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeItemById(contactId);
  res.status(200).json(result);
};

module.exports = {
  remove,
};
