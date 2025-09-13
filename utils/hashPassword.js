const bcrypt = require("bcryptjs");
const { BCRYPT_SALT_ROUNDS } = require("../config/env");

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return await bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
