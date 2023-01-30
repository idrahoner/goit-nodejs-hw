const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactList = path.join(__dirname, './contacts.json');

const writeToFile = async (body) => {
  const preparedBody = JSON.stringify(body, null, 2);
  await fs.writeFile(contactList, preparedBody);
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactList);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const currentContact = contacts.find(({ id }) => id === contactId);
    if (!currentContact) throw new Error('Wrong contact id');
    return currentContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) throw new Error('Wrong contact id');
    contacts.splice(contactIndex, 1);
    await writeToFile(contacts);
    return 'contact deleted';
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: shortid.generate(), ...body };
    contacts.push(newContact);
    await writeToFile(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) throw new Error('Wrong contact id');
    const newContact = { id: contactId, ...body };
    contacts.splice(contactIndex, 1, newContact);
    await writeToFile(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
