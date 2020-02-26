exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(404).send(err);
  } else {
    next(err);
  }
};

exports.handleSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid data type" });
  }
};
