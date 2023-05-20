const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(`${contactsPath}`, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error)
  }
  
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error)
  }
  
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return console.log("This contacts not found");
    }
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, +1));
    return deletedContact;
  } catch (error) {
    console.log(error)
  }
  
}

async function addContact(name, email, phone) {
  try {
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
    const newContactsObj = [...contacts, newContact];
    await fs.writeFile(
      `${contactsPath}`,
      JSON.stringify(newContactsObj, null, +1)
    );
    return newContact;
  } catch (error) {
    console.log(error)
  }
  
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
