exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
};

exports.handleSQLErrors = (err, req, res, next) => {
  const refObj = { err400s: ["22P02", "23503", "42703"] };

  if (refObj.err400s.includes(err.code)) {
    res.status(400).send({ msg: "Invalid input data" });
  }
};

exports.otherRoutes404 = (req, res, next) => {
  res.status(404).send({ status: 404, msg: "This route does not exist" });
};
