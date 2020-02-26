const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticle
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle);

module.exports = articlesRouter;
