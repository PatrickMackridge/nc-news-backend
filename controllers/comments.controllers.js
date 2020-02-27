const {
  addNewComment,
  fetchCommentsByArticleId,
  updateCommentVotesById,
  removeCommentById
} = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  const newComment = req.body;
  const article_id = req.params;
  addNewComment(newComment, article_id)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

exports.getCommentsByArticle = (req, res, next) => {
  const article_id = req.params;
  const queries = req.query;
  fetchCommentsByArticleId(article_id, queries)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchCommentVotesById = (req, res, next) => {
  const comment_id = req.params;
  const inc_votes = req.body;
  updateCommentVotesById(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const comment_id = req.params;
  removeCommentById(comment_id)
    .then(comment => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};
