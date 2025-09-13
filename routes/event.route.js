const express = require("express");
const {
  getPublishedEvents,
  getPublishedEventById,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
} = require("../controllers/event.controller");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { upload } = require("./../config/cloudinary");

const eventRouter = express.Router();

// Public (only published events visible)
eventRouter.get("/", getPublishedEvents);
eventRouter.get("/:id", getPublishedEventById);

// Admin only
eventRouter.get("/admin/all", adminMiddleware, getAllEvents);
eventRouter.post("/", adminMiddleware, upload.single("image"), createEvent);
eventRouter.put("/:id", adminMiddleware, upload.single("image"), updateEvent);
eventRouter.delete("/:id", adminMiddleware, deleteEvent);
eventRouter.patch("/:id/publish", adminMiddleware, publishEvent);
eventRouter.patch("/:id/unpublish", adminMiddleware, unpublishEvent);

module.exports = eventRouter;
