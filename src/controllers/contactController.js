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
      .select("contacts.*", "phonenumbers.number")
      .leftJoin("phonenumbers", "contacts.id", "phonenumbers.contact_id")
      .then((contacts) => {
        for (let i = 0; i < contacts.length; i++) {
          if (i === 0) {
            continue;
          } else {
            let id = contacts[i - 1].id;

            if (contacts[i].id === id) {
              if (typeof contacts[i - 1].number === "string") {
                contacts[i - 1].number = [
                  contacts[i - 1].number,
                  contacts[i].number,
                ];
              } else {
                contacts[i - 1].number = [
                  ...contacts[i - 1].number,
                  contacts[i].number,
                ];
              }
              contacts.splice(i, 1);
            }
          }
        }
        return response.json(contacts);
      })
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
