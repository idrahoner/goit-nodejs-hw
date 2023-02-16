const { contactsService } = require('../services');

const getAll = async (req, res) => {
  // console.log('   requires query    ===>    ', req.query);
  const contacts = await contactsService.getAllEntities(req.ownerId, req.query);
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getItemById(contactId, req.ownerId);
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await contactsService.addItem(req.body, req.ownerId);
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeItemById(contactId, req.ownerId);
  res.status(200).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateItemById(
    contactId,
    req.body,
    req.ownerId
  );
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
