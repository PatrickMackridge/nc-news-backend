exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(404).send(err);
  } else {
    next(err);
  }
};
