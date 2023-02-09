const { ContactModel } = require('../models');
const {
  prepareResponse,
  validateId,
  generateError,
  responseErrors,
} = require('../helpers');

const getAllEntities = async () => {
  const contacts = await ContactModel.find({});
  return contacts.map((contact) => prepareResponse(contact));
};

const getItemById = async (id) => {
  validateId(id);
  const contact = await ContactModel.findById(id);
  if (!contact) throw generateError(responseErrors.notFound);
  return prepareResponse(contact);
};

const addItem = async (body) => {
  const { name, email, phone, favorite = false } = body;
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
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
