const { ContactModel } = require('../models');
const { generateError, responseErrors, validateId } = require('../helpers');
const { prepareResponse } = require('../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const contact = await ContactModel.findById(contactId);
  if (!contact) throw generateError(responseErrors.notFound);
  res.status(200).json(prepareResponse(contact));
};

module.exports = {
  getById,
};
