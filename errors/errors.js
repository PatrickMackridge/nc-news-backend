exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
};

exports.handleSQLErrors = (err, req, res, next) => {
  const refObj = {
    "22P02": { status: 400, msg: "Invalid input data" },
    "42703": { status: 400, msg: "Invalid input data" },
    "23503": { status: 422, msg: "Un-processable entity" }
  };
  res.status(refObj[err.code].status).send(refObj[err.code]);

  // if (refObj.err400s.includes(err.code)) {
  //   res.status(400).send({ msg: "Invalid input data" });
  // } else
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ status: 405, msg: "Method not allowed" });
};

exports.handle422s = (req, res, next) => {
  res.status(422).send({ status: 422, msg: "Un-processable entity" });
};

exports.handleAllOtherRoutes404 = (req, res, next) => {
  res.status(404).send({ status: 404, msg: "This route does not exist" });
};
