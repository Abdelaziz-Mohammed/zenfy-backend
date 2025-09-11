const path = require("path");
const dotenv = require("dotenv");

// load .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const required = (name, val) => {
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
};

const NODE_ENV = process.env.NODE_ENV || "development";

// Auto-set CORS_ORIGIN based on environment
let CORS_ORIGIN;
if (NODE_ENV === "production") {
  CORS_ORIGIN = process.env.FRONTEND_URL; // your deployed frontend
} else {
  CORS_ORIGIN = "http://localhost:3000"; // dev frontend
}

module.exports = {
  // Basic
  NODE_ENV,
  PORT: parseInt(process.env.PORT || "4000", 10),
  CORS_ORIGIN,
  FRONTEND_URL: required("FRONTEND_URL", process.env.FRONTEND_URL),
  MONGODB_URI: required("MONGODB_URI", process.env.MONGODB_URI),
  JWT_SECRET: required("JWT_SECRET", process.env.JWT_SECRET),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: required("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: required("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: required("CLOUDINARY_API_SECRET", process.env.CLOUDINARY_API_SECRET),
  // Nodemailer
  EMAIL_HOST: required("EMAIL_HOST", process.env.EMAIL_HOST),
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "587", 10),
  EMAIL_USER: required("EMAIL_USER", process.env.EMAIL_USER),
  EMAIL_PASS: required("EMAIL_PASS", process.env.EMAIL_PASS),
};
