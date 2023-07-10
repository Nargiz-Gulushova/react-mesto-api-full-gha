const { SERVER_ERROR } = require('../utils/config');

const errorsHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const getMessage = statusCode === 500 ? SERVER_ERROR : message;

  res
    .status(statusCode)
    .send({ message: getMessage });

  next();
});

module.exports = errorsHandler;
