const express = require("express");
const {
  getPublishedArticles,
  getPublishedArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
} = require("../controllers/article.controller");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const articleRouter = express.Router();

// Public
articleRouter.get("/", getPublishedArticles);
articleRouter.get("/:id", getPublishedArticleById);

// Admin only
articleRouter.post("/", adminMiddleware, createArticle);
articleRouter.put("/:id", adminMiddleware, updateArticle);
articleRouter.delete("/:id", adminMiddleware, deleteArticle);
articleRouter.patch("/:id/publish", adminMiddleware, publishArticle);
articleRouter.patch("/:id/unpublish", adminMiddleware, unpublishArticle);

module.exports = articleRouter;
