const express = require("express");
const cors = require("cors");

const contactsRouter = require("./src/routes/contacts.routes");
const phoneNumbersRouter = require("./src/routes/phoneNumbers.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(contactsRouter);
app.use(phoneNumbersRouter);

app.listen(3000, () => {
  console.log("Server is running.");
});
