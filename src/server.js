const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const { connectDB } = require("./config/db");

(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // We’ll add Socket.IO here..
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
