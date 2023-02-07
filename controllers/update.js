const { ContactModel } = require('../models');
const { validateId, generateError, responseErrors } = require('../helpers');

const update = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const updatedContact = await ContactModel.updateOne(
    { _id: contactId },
    req.body
  );
  if (!updatedContact.matchedCount)
    throw generateError(responseErrors.notFound);
  const contact = await ContactModel.findById(contactId);
  res.status(200).json(contact);
};

module.exports = {
  update,
};
