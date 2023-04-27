const express = require("express");
const ContactController = require("../controllers/contactController");

const connection = require("../database/connection");
const router = express.Router();

router.post("/contacts", ContactController.newContact);
router.get("/contacts", ContactController.listContacts);
router.patch("/contacts/:id", ContactController.updateContact);
router.delete("/contacts/:id", ContactController.deleteContact);

module.exports = router;
