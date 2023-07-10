const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserData,
  patchUserAvatar,
  getUserInfo,
} = require('../controllers/userController');
const { validateUserId, validatePatchUserData, validatePatchUserAvatar } = require('../utils/validations');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:id', validateUserId, getUserById);
userRouter.patch('/me', validatePatchUserData, patchUserData);
userRouter.patch('/me/avatar', validatePatchUserAvatar, patchUserAvatar);

module.exports = userRouter;
