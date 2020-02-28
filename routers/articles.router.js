const articlesRouter = require("express").Router();
const commentsRouter = require("./comments.router");
const {
  getArticleById,
  patchArticle,
  getArticles
} = require("../controllers/articles.controllers");
const {
  postComment,
  getCommentsByArticle
} = require("../controllers/comments.controllers");
const { handle405s } = require("../errors/errors");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticle)
  .all(handle405s);

module.exports = articlesRouter;
