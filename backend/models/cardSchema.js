const { Schema, model } = require('mongoose');
const validator = require('validator');
const { VALIDATION_URL_ERROR } = require('../utils/config');

const cardSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: VALIDATION_URL_ERROR,
      },
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'user',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('card', cardSchema);
