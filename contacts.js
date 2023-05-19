const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return console.log("This contacts not found");
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, +1));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const duplicateContact = contacts.findIndex(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (duplicateContact !== -1) {
    return console.log("This contact is alredy in contacts");
  }
  const newContactsObj = [...contacts, newContact]
  await fs.writeFile(`${contactsPath}`, JSON.stringify(newContactsObj, null, +1));
  return newContact;
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
