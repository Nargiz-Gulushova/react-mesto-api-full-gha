const { ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const {
  BAD_REQUEST_ERROR,
  STATUS_SUCCESS_CREATED,
  CONFLICT_DUPLICATE_CODE,
  CONFLICT_DUPLICATE_ERROR,
  TOKEN_KEY,
  NOT_FOUND_ERROR,
} = require('../utils/config');
const ConflictDuplicate = require('../errors/ConflictDuplicate');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.id)
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res
      .status(STATUS_SUCCESS_CREATED)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
    .catch((err) => {
      if (err.code === CONFLICT_DUPLICATE_CODE) {
        next(new ConflictDuplicate(CONFLICT_DUPLICATE_ERROR));
      } else if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  const getSecretKey = NODE_ENV === 'production'
    ? JWT_SECRET
    : 'super-strong-secret';

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, getSecretKey, { expiresIn: '7d' });
      res
        .cookie(TOKEN_KEY, token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ email });
    })
    .catch(next);
};

function logout(req, res, next) {
  User.findById({ _id: req.user._id })
    .then(() => {
      res
        .clearCookie(TOKEN_KEY, { httpOnly: true })
        .send({ data: 'Вы успешно вышли из аккаунта.' });
    })
    .catch(next);
}

function patchUserData(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
}

function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  patchUserData,
  patchUserAvatar,
  login,
  logout,
};
