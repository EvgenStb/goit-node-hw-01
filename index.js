// const argv = require("yargs").argv;
const { Command } = require("commander");
const program = new Command();
program
.option ("-a, --action <type>", "choose action" )
.option("-i, --id <type>", "user id")
.option("-n, --name <type>", "user name")
.option("-e, --email <type>", "user email")
.option("-p, --phone <type>", "user phone")

program.parse(process.argv)
const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deletContact = await removeContact(id);
      return console.log(deletContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
  
};

invokeAction(argv);

// invokeAction({action: 'list'})
// invokeAction({ action: "remove", id: "38a2acda-f517-4b37-8592-a1754d681742" });
// invokeAction({
//   action: "add",
//   name: "John3 Smith",
//   email: "johns@gmail.com",
//   phone: " +333333333",
// });