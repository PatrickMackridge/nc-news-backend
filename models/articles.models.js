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

exports.fetchArticles = ({ sort_by, order, author, topic }) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author !== undefined) {
        query.where({ "articles.author": author });
      }
    })
    .modify(query => {
      if (topic !== undefined) {
        query.where({ "articles.topic": topic });
      }
    })
    .then(articles => {
      return articles;
    });
};
