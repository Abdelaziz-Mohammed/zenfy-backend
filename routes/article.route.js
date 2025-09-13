const express = require("express");
const {
  getPublishedArticles,
  getPublishedArticleById,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
} = require("../controllers/article.controller");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { upload } = require("./../config/cloudinary");

const articleRouter = express.Router();

// Public
articleRouter.get("/", getPublishedArticles);
articleRouter.get("/:id", getPublishedArticleById);

// Admin only
articleRouter.get("/admin/all", adminMiddleware, getAllArticles);
articleRouter.post("/", adminMiddleware, upload.single("image"), createArticle);
articleRouter.put("/:id", adminMiddleware, upload.single("image"), updateArticle);
articleRouter.delete("/:id", adminMiddleware, deleteArticle);
articleRouter.patch("/:id/publish", adminMiddleware, publishArticle);
articleRouter.patch("/:id/unpublish", adminMiddleware, unpublishArticle);

module.exports = articleRouter;
