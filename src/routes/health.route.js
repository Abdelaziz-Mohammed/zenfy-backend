const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

module.exports = healthRouter;
