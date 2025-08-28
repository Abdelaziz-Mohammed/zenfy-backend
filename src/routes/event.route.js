const express = require("express");
const {
  getPublishedEvents,
  getPublishedEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
} = require("../controllers/event.controller");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const eventRouter = express.Router();

// Public (only published events visible)
eventRouter.get("/", getPublishedEvents);
eventRouter.get("/:id", getPublishedEventById);

// Admin only (full CRUD + publish/unpublish)
eventRouter.post("/", adminMiddleware, createEvent);
eventRouter.put("/:id", adminMiddleware, updateEvent);
eventRouter.delete("/:id", adminMiddleware, deleteEvent);
eventRouter.patch("/:id/publish", adminMiddleware, publishEvent);
eventRouter.patch("/:id/unpublish", adminMiddleware, unpublishEvent);

module.exports = eventRouter;
