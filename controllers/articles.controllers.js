const {
  fetchArticleById,
  updateArticle
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
