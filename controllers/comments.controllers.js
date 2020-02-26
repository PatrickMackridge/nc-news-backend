const { addNewComment } = require("../models/comments.models");

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
