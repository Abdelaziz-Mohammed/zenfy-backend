const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(MONGODB_URI);
  isConnected = true;
  console.log("MongoDB connected successfully..");
  return mongoose.connection;
}

module.exports = { connectDB };
