const jwtTokenService = require('../services/jwt.service')
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const { UnauthorizeError, ForbiddenError } = require('../errors/Errors')

exports.authUserRoute = (req, res, next) => {
  try {
    const token = req.headers['token']
    if (!token) return next(new UnauthorizeError())
    const decodedToken = jwtTokenService.verifyAccessToken(token)
    req.user = decodedToken
    if (
      req.user.userId === req.params.id ||
      req.user.role === 'admin' ||
      req.user.role === 'employee'
    ) {
      next()
    } else {
      next(new UnauthorizeError("You Don't Have Access"))
    }
  } catch (error) {
    console.log('Error Auth: ', error instanceof JsonWebTokenError)

    if (error instanceof TokenExpiredError) {
      return next(new UnauthorizeError('Token Expired'))
    }
    if (error instanceof JsonWebTokenError) {
      return next(new UnauthorizeError('Invalid Token 2'))
    }
  }
}
