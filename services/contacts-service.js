const { ContactModel } = require('../models');
const {
  prepareResponse,
  validateId,
  generateError,
  responseErrors,
} = require('../helpers');

const getAllEntities = async (ownerId) => {
  const contacts = await ContactModel.find({ owner: ownerId });
  return contacts.map((contact) => prepareResponse(contact));
};

const getItemById = async (id) => {
  validateId(id);
  const contact = await ContactModel.findOne({ _id: id });
  if (!contact) throw generateError(responseErrors.notFound);
  return prepareResponse(contact);
};

const addItem = async (body, ownerId) => {
  const { name, email, phone, favorite = false } = body;
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner: ownerId,
  });
  return prepareResponse(newContact);
};

const removeItemById = async (id) => {
  validateId(id);
  const contact = await ContactModel.findByIdAndRemove(id);
  if (!contact) throw generateError(responseErrors.notFound);
  return { message: 'Contact deleted' };
};

const updateItemById = async (id, body) => {
  validateId(id);
  const { name, email, phone, favorite } = body;
  const updatedContact = await ContactModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { returnDocument: 'after', runValidators: true }
  );
  if (!updatedContact) throw generateError(responseErrors.notFound);
  return prepareResponse(updatedContact);
};

module.exports = {
  getAllEntities,
  getItemById,
  addItem,
  removeItemById,
  updateItemById,
};
