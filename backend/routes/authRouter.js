const authRouter = require('express').Router();
const { login, createUser, logout } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { validateUserSignin, validateUserSignup } = require('../utils/validations');

authRouter.post('/signin', validateUserSignin, login);
authRouter.post('/signup', validateUserSignup, createUser);
authRouter.use('/signout', auth, logout);

module.exports = authRouter;
