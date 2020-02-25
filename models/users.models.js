const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  return connection("users")
    .where(username)
    .returning("*")
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          msg: "This user does not exist",
          status: 404
        });
      }
      return user[0];
    });
};
