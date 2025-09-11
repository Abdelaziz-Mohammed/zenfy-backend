const express = require("express");
const { upload } = require("../config/cloudinary");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const uploadRouter = express.Router();

// Admin uploads image
uploadRouter.post("/", adminMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(201).json({
    message: "Image uploaded successfully",
    url: req.file.path, // Cloudinary URL
  });
});

module.exports = uploadRouter;
