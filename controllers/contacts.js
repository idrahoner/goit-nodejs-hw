const contactsApi = require('../models/contacts');
const checkResultSuccess = require('../utils/check-result-success');

const getAll = async (req, res) => {
  try {
    const contacts = await contactsApi.listContacts();
    checkResultSuccess(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'something went wrong, please try again later' });
  }
};

const get = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsApi.getContactById(contactId);
    checkResultSuccess(contact);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: 'not found' });
  }
};

const add = async (req, res) => {
  try {
    const newContact = await contactsApi.addContact(req.body);
    checkResultSuccess(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'something went wrong, please try again later' });
  }
};

const remove = async (req, res) => {
  try {
    const { contactId } = req.params;
    const status = await contactsApi.removeContact(contactId);
    checkResultSuccess(status);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const update = async (req, res) => {
  try {
    const { contactId } = req.params;
    const newContact = await contactsApi.updateContact(contactId, req.body);
    checkResultSuccess(newContact);
    res.status(200).json(newContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
