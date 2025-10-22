const Event = require("./../models/event.model");

// ================= PUBLIC ==================

// Get all published events
const getPublishedEvents = async (req, res) => {
  try {
    const events = await Event.find({ published: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Get single published event by ID
const getPublishedEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, published: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// ================= ADMIN ==================

// Get ALL events (published + unpublished) for admin
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ order: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Create new event (always unpublished)
const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, published: false }; // force unpublished
    if (req.file) eventData.imageUrl = req.file.path; // Cloudinary URL
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Update event (never auto-publish)
const updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body, published: false }; // force unpublished
    if (req.file) updateData.imageUrl = req.file.path; // Cloudinary URL
    if (updateData.title) {
      const slugify = require("slugify");
      updateData.slug = slugify(updateData.title, { lower: true, strict: true });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

// Publish event
const publishEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { published: true }, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event published", event });
  } catch (error) {
    res.status(500).json({ message: "Error publishing event", error: error.message });
  }
};

// Unpublish event
const unpublishEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { published: false }, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event unpublished", event });
  } catch (error) {
    res.status(500).json({ message: "Error unpublishing event", error: error.message });
  }
};

// Reorder events
const reorderEvents = async (req, res) => {
  try {
    const { order } = req.body; // Array of event IDs in new order

    if (!Array.isArray(order)) {
      return res.status(400).json({ message: "Invalid order format" });
    }

    for (let i = 0; i < order.length; i++) {
      await Event.findByIdAndUpdate(order[i], { order: i });
    }

    const updatedEvents = await Event.find().sort({ order: 1 });

    res.status(200).json(updatedEvents);
  } catch (error) {
    res.status(500).json({ message: "Error reordering events", error: error.message });
  }
};

module.exports = {
  getPublishedEvents,
  getPublishedEventById,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
  reorderEvents,
};
