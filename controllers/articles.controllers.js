const {
  fetchArticleById,
  updateArticle,
  fetchArticles
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const article_id = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const article_id = req.params;
  updateArticle(article_id, req.body)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const queries = req.query;
  fetchArticles(queries)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};
