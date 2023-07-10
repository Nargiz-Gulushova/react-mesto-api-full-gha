const { ValidationError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const Card = require('../models/cardSchema');
const {
  STATUS_SUCCESS_CREATED,
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
} = require('../utils/config');

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_SUCCESS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
}

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function deleteCardById(req, res, next) {
  Card.findById({ _id: req.params.cardId })
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden(FORBIDDEN_ERROR));
      }
      return Card
        .deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFound(NOT_FOUND_ERROR))
    .then((card) => res.send({ data: card }))
    .catch(next);
}

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
