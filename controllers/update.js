const { ContactModel } = require('../models');
const {
  validateId,
  generateError,
  responseErrors,
  prepareResponse,
} = require('../helpers');

const update = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const updatedContact = await ContactModel.findByIdAndUpdate(
    contactId,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );
  if (!updatedContact) throw generateError(responseErrors.notFound);

  res.status(200).json(prepareResponse(updatedContact));
};

module.exports = {
  update,
};
