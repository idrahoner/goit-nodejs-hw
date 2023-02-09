const { contactsService } = require('../services');

const getAll = async (req, res) => {
  const contacts = await contactsService.getAllEntities();
  res.status(200).json(contacts);
};

module.exports = {
  getAll,
};
