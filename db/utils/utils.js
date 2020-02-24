process.env.NODE_ENV = "test";
const { expect } = require("chai");

exports.formatDates = list => {
  list.forEach(object => {
    const dateString = new Date(object.created_at).toUTCString();
    object.created_at = dateString;
  });
  return list;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
