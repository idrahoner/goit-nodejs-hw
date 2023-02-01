const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const { generateError, responseErrors } = require('../helpers');

const contactList = path.join(__dirname, './contacts.json');

const writeToFile = async (body) => {
  const preparedBody = JSON.stringify(body, null, 2);
  await fs.writeFile(contactList, preparedBody);
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactList);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const currentContact = contacts.find(({ id }) => id === contactId);
  if (!currentContact) throw generateError(responseErrors.notFound);
  return currentContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) throw generateError(responseErrors.notFound);
  contacts.splice(contactIndex, 1);
  await writeToFile(contacts);
  return 'contact deleted';
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: shortid.generate(), ...body };
  contacts.push(newContact);
  await writeToFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) throw generateError(responseErrors.notFound);
  const newContact = { ...contacts[contactIndex], ...body };
  contacts.splice(contactIndex, 1, newContact);
  await writeToFile(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
