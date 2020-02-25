const apiRouter = require("express").Router();
const { getTopics } = require("../controllers/topics.controllers");

apiRouter.route("/topics").get(getTopics);

module.exports = apiRouter;
