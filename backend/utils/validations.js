const { Joi, celebrate } = require('celebrate');
const { REG_EXP_FOR_URL_VALIDATION } = require('./config');

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EXP_FOR_URL_VALIDATION),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatePatchUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validatePatchUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REG_EXP_FOR_URL_VALIDATION).required(),
  }),
});

const validateNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(REG_EXP_FOR_URL_VALIDATION).required(),
  }),
});

module.exports = {
  validateUserId,
  validateCardId,
  validateUserSignup,
  validateUserSignin,
  validatePatchUserData,
  validatePatchUserAvatar,
  validateNewCard,
};
