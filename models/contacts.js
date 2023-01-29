const fs = require("fs/promises");
const path = require("path");

const contactList = path.join(__dirname, "./contacts.json");

const writeToFile = async (body) => {
  try {
    const preparedBody = JSON.stringify(body, null, 2);
    await fs.writeFile(contactList, preparedBody);
  } catch (error) {
    console.log(error);
  }
};

const generateId = (array) => {
  const newId = Number(array[array.length - 1].id) + 1;
  return String(newId);
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
    if (!currentContact) throw new Error("Wrong contact id");
    return currentContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) throw new Error("Wrong contact id");
    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactList, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push({ id: generateId(contacts), ...body });
    await writeToFile(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) throw new Error("Wrong contact id");
    contacts.splice(contactIndex, 1, { id: contactId, ...body });
    await writeToFile(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

// (async () => {
//   try {
//     const response = await updateContact("12", {
//       name: "hello",
//       email: "kitty",
//       phone: "777-777",
//     });
//     // if (!response) throw new Error("Wrong file name");
//     console.log("response: ", response);
//   } catch (error) {
//     console.log(error);
//   }
// })();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
