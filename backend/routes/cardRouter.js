const cardRouter = require('express').Router();
const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { validateNewCard, validateCardId } = require('../utils/validations');

cardRouter.post('/', validateNewCard, createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', validateCardId, deleteCardById);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
