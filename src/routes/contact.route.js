const express = require("express");
const { sendContactMessage, contactLimiter } = require("../controllers/contact.controller");

const contactRouter = express.Router();

contactRouter.post("/", contactLimiter, sendContactMessage);

module.exports = contactRouter;
