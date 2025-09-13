const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const { NODE_ENV, PORT, FRONTEND_URL } = require("./config/env");

// Routers
const healthRouter = require("./routes/health.route");
const authRouter = require("./routes/auth.route");
const eventRouter = require("./routes/event.route");
const articleRouter = require("./routes/article.route");
const adminRouter = require("./routes/admin.route");
const contactRouter = require("./routes/contact.route");

const app = express();

// ---------- Security Middlewares ----------
app.use(helmet());
app.use(
  cors({
    origin: NODE_ENV === "production" ? FRONTEND_URL : "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ---------- Rate Limiting ----------
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ---------- Routes ----------
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/articles", articleRouter);
app.use("/api/admins", adminRouter);
app.use("/api/contact", contactRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

// ---------- Error Handling ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Server Start ----------
(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
