const { ContactModel } = require('../models');
const { validateId, generateError, responseErrors } = require('../helpers');

const remove = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const result = await ContactModel.deleteOne({ _id: contactId });
  if (!result.deletedCount) throw generateError(responseErrors.notFound);
  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  remove,
};
