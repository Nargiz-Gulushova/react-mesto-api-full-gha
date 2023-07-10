const router = require('express').Router();
const NotFound = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { NOT_FOUND_ERROR } = require('../utils/config');

// роуты авторизации
router.use(require('./authRouter'));

// все ниже под защитой миддлварины авторизации
// роуты карточек
router.use('/cards', auth, require('./cardRouter'));
// роуты пользователей
router.use('/users', auth, require('./userRouter'));
// отлов 404
router.use('*', auth, (req, res, next) => next(new NotFound(NOT_FOUND_ERROR)));

module.exports = router;
