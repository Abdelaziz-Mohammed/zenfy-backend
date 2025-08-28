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
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get single published event by ID
const getPublishedEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, published: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// ================= ADMIN ==================

// Create new event
const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, published: false }; // force unpublished
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Update event (never auto-publish)
const updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body, published: false }; // force unpublished
    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Publish event
const publishEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { published: true },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event published", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error publishing event", error: error.message });
  }
};

// Unpublish event
const unpublishEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { published: false },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event unpublished", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unpublishing event", error: error.message });
  }
};

module.exports = {
  getPublishedEvents,
  getPublishedEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
};
