const express = require("express");
const apiRouter = require("./routers/api.router");
const { handleCustomErrors, handleSQLErrors } = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleSQLErrors);

module.exports = app;
