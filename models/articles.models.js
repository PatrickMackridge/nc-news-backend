const connection = require("../db/connection");

exports.fetchArticleById = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .then(articleArr => {
      if (articleArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found"
        });
      }
      return articleArr[0];
    });
};

exports.updateArticle = ({ article_id }, { inc_votes }) => {
  return connection("articles")
    .increment({ votes: inc_votes })
    .where({ article_id: article_id })
    .returning("*")
    .then(updatedArticle => {
      if (updatedArticle.length === 0) {
        return Promise.reject({
          msg: "Article not found",
          status: 404
        });
      }
      return updatedArticle[0];
    });
};
