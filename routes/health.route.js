const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

module.exports = healthRouter;
