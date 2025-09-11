const Article = require("../models/article.model");

// ================= PUBLIC ==================

// Get all published articles
const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
};

// Get single published article by ID
const getPublishedArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id, published: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error: error.message });
  }
};

// ================= ADMIN ==================

// Get ALL articles (published + unpublished) for admin
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all articles", error: error.message });
  }
};

// Create new article (always unpublished)
const createArticle = async (req, res) => {
  try {
    const articleData = { ...req.body, published: false }; // force unpublished
    if (req.file) articleData.imageUrl = req.file.path; // Cloudinary URL
    const article = new Article(articleData);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error: error.message });
  }
};

// Update article (does not auto-publish)
const updateArticle = async (req, res) => {
  try {
    const updateData = { ...req.body, published: false }; // force unpublished
    if (req.file) updateData.imageUrl = req.file.path; // Cloudinary URL
    if (updateData.title) {
      const slugify = require("slugify");
      updateData.slug = slugify(updateData.title, { lower: true, strict: true });
    }
    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error: error.message });
  }
};

// Delete article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error: error.message });
  }
};

// Publish article
const publishArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { published: true }, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article published", article });
  } catch (error) {
    res.status(500).json({ message: "Error publishing article", error: error.message });
  }
};

// Unpublish article
const unpublishArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { published: false }, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article unpublished", article });
  } catch (error) {
    res.status(500).json({ message: "Error unpublishing article", error: error.message });
  }
};

module.exports = {
  getPublishedArticles,
  getPublishedArticleById,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
};
