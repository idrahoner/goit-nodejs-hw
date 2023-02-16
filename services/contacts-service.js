const { ContactModel } = require('../models');
const {
  renameIdField,
  validateId,
  generateError,
  responseErrors,
} = require('../helpers');

// TODO refactor query to db and pagination
const getAllEntities = async (
  owner,
  { page = 1, limit = 20, favorite = { $in: [true, false] } } = {}
) => {
  const contacts = await ContactModel.find(
    { owner, favorite },
    { owner: 0, __v: 0 },
    { skip: (Number(page) - 1) * Number(limit), limit: Number(limit) }
  );
  return contacts.map((contact) => renameIdField(contact));
};

const getItemById = async (id, owner) => {
  validateId(id);
  const contact = await ContactModel.findOne(
    { _id: id, owner },
    { owner: 0, __v: 0 }
  );
  if (!contact) throw generateError(responseErrors.notFound);
  return renameIdField(contact);
};

const addItem = async ({ name, email, phone, favorite }, owner) => {
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  return {
    id: newContact._id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    favorite: newContact.favorite,
  };
};

const removeItemById = async (id, owner) => {
  validateId(id);
  const contact = await ContactModel.findOneAndRemove({
    _id: id,
    owner,
  });
  if (!contact) throw generateError(responseErrors.notFound);
  return { message: 'Contact deleted' };
};

const updateItemById = async (id, body, owner) => {
  validateId(id);
  const { name, email, phone, favorite } = body;
  const updatedContact = await ContactModel.findOneAndUpdate(
    { _id: id, owner },
    {
      name,
      email,
      phone,
      favorite,
      owner,
    },
    { returnDocument: 'after', runValidators: true }
  ).select({ owner: 0, __v: 0 });
  if (!updatedContact) throw generateError(responseErrors.notFound);
  return renameIdField(updatedContact);
};

module.exports = {
  getAllEntities,
  getItemById,
  addItem,
  removeItemById,
  updateItemById,
};
