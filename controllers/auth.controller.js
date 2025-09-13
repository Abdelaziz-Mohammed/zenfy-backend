const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Admin = require("./../models/admin.model");
const { validationResult } = require("express-validator");
const { sendEmailService } = require("../services/sendEmail");
const { JWT_SECRET, JWT_EXPIRES_IN, FRONTEND_URL } = require("../config/env");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!admin.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    if (admin.isPending) {
      return res.status(403).json({ message: "Account pending approval" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account disabled" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role, name: admin.name }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error: ", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newAdmin = new Admin({
      name,
      email,
      password,
      role: role || "admin",
      isPending: true,
      isVerified: false,
      verificationToken,
    });

    await newAdmin.save();

    // send verification email
    const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      email
    )}`;

    await sendEmailService({
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${name}, please verify your email to continue:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p><b>Note:</b> The link works only once</p>
      `,
    });

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error: ", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { login, register };
