const express = require("express");
const connection = require("../database/connection");
const phoneNumbersController = require("../controllers/phoneNumbersController");
const router = express.Router();

router.post("/phoneNumbers/:id", phoneNumbersController.newPhoneNumber);
router.get("/phoneNumbers", phoneNumbersController.listPhoneNumbers);
router.patch("/phoneNumbers/:id", phoneNumbersController.updatePhoneNumber);
router.delete("/phoneNumbers/:id", phoneNumbersController.deletePhoneNumber);

module.exports = router;
