const express = require("express");
const apiRouter = require("./routers/api.router");
const { handleCustomErrors } = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);

module.exports = app;
