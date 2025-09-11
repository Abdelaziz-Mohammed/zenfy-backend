const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { CORS_ORIGIN, NODE_ENV } = require("./config/env");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

// Routers
const healthRouter = require("./routes/health.route");
const authRouter = require("./routes/auth.route");
const eventRouter = require("./routes/event.route");
const articleRouter = require("./routes/article.route");
const adminRouter = require("./routes/admin.route");
const contactRouter = require("./routes/contact.route");

const app = express();

// Security & basics
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (NODE_ENV !== "production") app.use(morgan("dev"));

// Basic rate limiting (tune later / per route)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/articles", articleRouter);
app.use("/api/admins", adminRouter);
app.use("/api/contact", contactRouter);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
