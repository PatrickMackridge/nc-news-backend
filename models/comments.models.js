const connection = require("../db/connection");
const {
  fetchArticleById,
  updateCommentVotesById
} = require("../models/articles.models");

exports.addNewComment = ({ username, body }, { article_id }) => {
  if (username === undefined || body === undefined) {
    return Promise.reject({ status: 400, msg: "Invalid input data" });
  }
  return connection("comments")
    .insert({ author: username, body, article_id })
    .returning("*")
    .then(comments => {
      if (comments.length === 0) {
        console.log(comments);
        return Promise.reject({
          msg: "Article not found",
          status: 404
        });
      }
      return comments[0];
    });
};

exports.retrieveCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .then(comments => {
      return comments;
    });
};

exports.fetchCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
  return Promise.all([
    this.retrieveCommentsByArticleId({ article_id }, { sort_by, order }),
    fetchArticleById({ article_id })
  ]).then(([comments, article]) => {
    return comments;
  });
};

exports.updateCommentVotesById = ({ comment_id }, { inc_votes }) => {
  const votes = inc_votes;
  return connection("comments")
    .increment({ votes: votes })
    .where({ comment_id })
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return comment[0];
    });
};
