const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_ERROR } = require('../utils/config');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized(TOKEN_ERROR));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
