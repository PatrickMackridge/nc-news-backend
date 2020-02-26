const connection = require("../db/connection");

exports.fetchArticleById = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .returning("*")
    .then(articleArr => {
      if (articleArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "This article does not exist"
        });
      }
      return articleArr[0];
    });
};
