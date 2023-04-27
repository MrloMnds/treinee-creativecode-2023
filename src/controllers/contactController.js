const database = require("../database/connection.js");

class ContactController {
  newContact(request, response) {
    const { name, address } = request.body;

    database
      .insert({ name, address })
      .table("contacts")
      .then((contact) => {
        response.json({ message: "Contact created." });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async listContacts(request, response) {
    await database("contacts")
      .leftJoin("phonenumbers", "contacts.id", "phonenumbers.contact_id")
      .select(
        "contacts.id",
        "contacts.name",
        "contacts.address",
        "phonenumbers.number"
      )
      .then((contacts) => response.json(contacts))
      .catch((error) => {
        console.log(error);
      });
  }

  async updateContact(request, response) {
    const { name, address } = request.body;

    if (name) {
      await database
        .where({ id: request.params.id })
        .update({ name: name })
        .table("contacts")
        .catch((error) => {
          console.log(error);
        });
    }

    if (address) {
      await database
        .where({ id: request.params.id })
        .update({ address: address })
        .table("contacts")
        .catch((error) => {
          console.log(error);
        });
    }

    database
      .select("*")
      .table("contacts")
      .where({ id: request.params.id })
      .then((contact) => response.json(contact))
      .catch((error) => {
        console.log(error);
      });
  }

  deleteContact(request, response) {
    database
      .where({ id: request.params.id })
      .del()
      .table("contacts")
      .then((data) =>
        response.json({
          message: "Contact deleted.",
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new ContactController();
