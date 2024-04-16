const express = require("express");
const {sendEmail} = require("../controllers/contact.js");

const router = express.Router();

router.post("/send", sendEmail);

module.exports = router;