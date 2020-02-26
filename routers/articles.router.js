const articlesRouter = require("express").Router();
const commentsRouter = require("./comments.router");
const {
  getArticleById,
  patchArticle
} = require("../controllers/articles.controllers");

const { postComment } = require("../controllers/comments.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle);

articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = articlesRouter;
