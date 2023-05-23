const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const { USER_ROLE } = require('../constants/user.constants')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [false, 'First Name Is Required'],
    },
    lastName: {
      type: String,
      required: [false, 'Last Name Is Required'],
    },
    email: {
      type: String,
      required: [false, 'Email Is Required'],
      unique: [true, 'Email already exist'],
    },
    username: {
      type: String,
      required: [false, 'Username Is Required'],
      unique: [true, 'The Username Exists'],
    },
    password: {
      type: String,
      required: [false, 'Password Is Required'],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
      required: [false, 'Role Is Required'],
    },
    location: {
      city: { type: String, required: false },
      street: { type: String, required: false },
      zipCode: { type: Number, required: false },
    },
    phoneNumber: {
      type: String,
      required: [false, 'Phone Number Is Required'],
      unique: [true, 'Phone Number already exist'],
    },
    profileImage: {
      type: String,
      required: [false, 'Image Profile Is Required'],
    },
    jwt_ac_token: { type: String },
    jwt_rf_token: { type: String },
  },
  { timestamps: true },
)

// After Save (pre) || Before Save (post) - Password Validator With Hash
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  next()
})

// Compare Password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

// Save JWT Tokens In Database
userSchema.methods.setJwtTokens = function (accessToken, refreshToken) {
  this.jwt_ac_token = accessToken
  this.jwt_rf_token = refreshToken
  return this.save()
}

module.exports = model('User', userSchema)
