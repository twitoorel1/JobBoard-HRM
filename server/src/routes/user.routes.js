const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const catchAsyncError = require('../errors/catchAsyncError')
const { authJwtRole } = require('../middlewares/authentication.middleware')
const { authUserRoute } = require('../middlewares/user.middleware')

// Routes For All User
router.get(
  '/find/:id',
  authUserRoute,
  catchAsyncError(userController.getUserById),
)
router.delete(
  '/delete/:id',
  authUserRoute,
  catchAsyncError(userController.deleteUserById),
)
router.put(
  '/update/:id',
  authUserRoute,
  catchAsyncError(userController.updateUserById),
)

/* Routes For Only Admin */
router.post(
  '/newUser',
  authJwtRole('admin'),
  catchAsyncError(userController.createNewUser),
)
router.get(
  '/allUsers',
  authJwtRole('admin'),
  catchAsyncError(userController.getAllUsers),
)

module.exports = router
