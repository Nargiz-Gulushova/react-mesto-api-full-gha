const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { VALIDATION_URL_ERROR, VALIDATION_EMAIL_ERROR, UNAUTH_ERROR } = require('../utils/config');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
      default: 'Исследователь океанов',
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: VALIDATION_URL_ERROR,
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: VALIDATION_EMAIL_ERROR,
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function compare(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(UNAUTH_ERROR));
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(UNAUTH_ERROR));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
