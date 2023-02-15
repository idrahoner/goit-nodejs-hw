const { contactsService } = require('../services');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getItemById(contactId);
  res.status(200).json(contact);
};

const getAll = async (req, res) => {
  const { _id: ownerId } = req.user;
  const contacts = await contactsService.getAllEntities(ownerId);
  res.status(200).json(contacts);
};

const add = async (req, res) => {
  const { _id: ownerId } = req.user;
  const newContact = await contactsService.addItem(req.body, ownerId);
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeItemById(contactId);
  res.status(200).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateItemById(
    contactId,
    req.body
  );
  res.status(200).json(updatedContact);
};

module.exports = {
  getById,
  getAll,
  add,
  remove,
  update,
};
