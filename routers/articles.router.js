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

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticle);

module.exports = articlesRouter;
