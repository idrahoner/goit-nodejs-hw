const { contactsService } = require('../services');

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateItemById(
    contactId,
    req.body
  );
  res.status(200).json(updatedContact);
};

module.exports = {
  update,
};
