process.env.NODE_ENV = "test";
const { expect } = require("chai");

exports.formatDates = list => {
  list.forEach(object => {
    const dateString = new Date(object.created_at).toUTCString();
    object.created_at = dateString;
  });
  return list;
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(article => {
    if (article.article_id !== undefined) {
      refObj[article.title] = article.article_id;
    }
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
