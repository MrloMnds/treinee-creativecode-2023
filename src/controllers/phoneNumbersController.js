const database = require("../database/connection");

class PhoneNumberController {
  async newPhoneNumber(request, response) {
    const { number } = request.body;
    const contactId = request.params.id;

    await database
      .insert({ number: number, contact_id: contactId })
      .table("phonenumbers")
      .catch((error) => {
        console.log(error);
      });

    database
      .select("*")
      .table("phonenumbers")
      .where({ "phonenumbers.id": contactId })
      .then((phonenumber) => {
        response.json({ message: "Phone number created." });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listPhoneNumbers(request, response) {
    database
      .select("*")
      .table("phonenumbers")
      .then((phonenumbers) => response.json(phonenumbers))
      .catch((error) => {
        console.log(error);
      });
  }

  async updatePhoneNumber(request, response) {
    const { number, contactId } = request.body;

    if (number) {
      await database
        .where({ id: request.params.id })
        .update({ number: number })
        .table("phonenumbers")
        .catch((error) => {
          console.log(error);
        });
    }

    if (contactId) {
      await database
        .where({ id: request.params.id })
        .update({ contact_id: contactId })
        .table("phonenumbers")
        .catch((error) => {
          console.log(error);
        });
    }

    database
      .select("*")
      .table("phonenumbers")
      .where({ id: request.params.id })
      .then((phonenumber) => response.json(phonenumber))
      .catch((error) => {
        console.log(error);
      });
  }

  deletePhoneNumber(request, response) {
    database
      .where({ id: request.params.id })
      .del()
      .table("phonenumbers")
      .then((data) =>
        response.json({
          message: "Phone number deleted.",
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new PhoneNumberController();
