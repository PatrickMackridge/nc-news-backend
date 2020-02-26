const connection = require("../db/connection");

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
          msg: "This article does not exist",
          status: 404
        });
      }
      return comments[0];
    });
};
