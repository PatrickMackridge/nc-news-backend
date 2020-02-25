process.env.NODE_ENV = "test";
const { expect } = require("chai");

exports.formatDates = list => {
  const formattedList = [];
  list.forEach(object => {
    const newObj = { ...object };
    const dateString = new Date(newObj.created_at).toUTCString();
    newObj.created_at = dateString;
    formattedList.push(newObj);
  });
  return formattedList;
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

exports.formatComments = (comments, articleRef) => {
  formattedComments = [];
  comments.forEach(comment => {
    comment.article_id = articleRef[comment.belongs_to];
    comment.author = comment.created_by;
    delete comment.belongs_to;
    delete comment.created_by;
    formattedComments.push(comment);
  });
  const commentsWithDates = this.formatDates(formattedComments);
  return commentsWithDates;
};
