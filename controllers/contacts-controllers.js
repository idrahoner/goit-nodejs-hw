const contactsApi = require('../models/contacts-api');

const getAll = async (req, res) => {
  const contacts = await contactsApi.listContacts();
  res.status(200).json(contacts);
};

const get = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsApi.getContactById(contactId);
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await contactsApi.addContact(req.body);
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  await contactsApi.removeContact(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await contactsApi.updateContact(contactId, req.body);
  res.status(200).json(newContact);
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
