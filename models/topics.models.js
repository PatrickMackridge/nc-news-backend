const connection = require("../db/connection");

exports.fetchTopics = () => {
  return connection("topics")
    .select("*")
    .returning("*")
    .then(topics => {
      console.log(topics, "MODEL");
      return topics;
    });
};
