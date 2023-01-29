const contactsApi = require("../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsApi.listContacts();
  res.status(200).json(contacts);
};

const get = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsApi.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = await contactsApi.addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const status = await contactsApi.removeContact(contactId);
  if (!status) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  const newContact = await contactsApi.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!newContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(newContact);
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
