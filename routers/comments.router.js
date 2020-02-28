const commentsRouter = require("express").Router();
const {
  patchCommentVotesById,
  deleteCommentById
} = require("../controllers/comments.controllers");
const { handle405s } = require("../errors/errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotesById)
  .delete(deleteCommentById)
  .all(handle405s);

module.exports = commentsRouter;
