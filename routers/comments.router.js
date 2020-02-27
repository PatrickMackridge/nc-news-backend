const commentsRouter = require("express").Router();
const {
  patchCommentVotesById
} = require("../controllers/comments.controllers");

commentsRouter.route("/:comment_id").patch(patchCommentVotesById);

module.exports = commentsRouter;
