const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { verifyEmail } = require("../controllers/verifyEmail.controller");
const { body } = require("express-validator");

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  login
);

authRouter.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);

authRouter.get("/verify-email", verifyEmail);

module.exports = authRouter;
