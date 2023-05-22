const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const RequestValidationService = require('../services/request-validation.service')
const { NotFoundError, ForbiddenError } = require('../errors/Errors')
const {
  SELECTED_USER_FIELDS,
  SELECTED_USER_FIELDS_ONLY_ADMINS,
} = require('../constants/user.constants')

/* Routes For All User */
exports.getUserById = async (req, res, next) => {
  const getUserById = await User.findById(req.params.id).select(
    SELECTED_USER_FIELDS,
  )
  if (!getUserById) return next(new NotFoundError('User not found'))
  res.status(200).json(getUserById)
}

exports.deleteUserById = async (req, res, next) => {
  const userDelete = await User.findByIdAndDelete(req.params.id)
  if (!userDelete) return next(new NotFoundError())
  res.send('User has been deleted...')
}

exports.updateUserById = async (req, res, next) => {
  await RequestValidationService.updateUserValidation(req.body, next)
  const user = await User.findById(req.params.id)
  if (!user) return next(new NotFoundError('User not found'))

  if (req.body.password) {
    // user.password = req.body.password && await bcrypt.hash(user.password, 12);
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(req.body.password, salt)
  }

  await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      password: user.password,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  res.send('User has been updated...')
}

/* Routes For Only Admin */
exports.createNewUser = async (req, res, next) => {
  return res.redirect(307, '/auth/register')
}

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select(SELECTED_USER_FIELDS_ONLY_ADMINS)
  if (!users) return next(new NotFoundError('Not Found Users'))
  res.status(200).send(users)
}
