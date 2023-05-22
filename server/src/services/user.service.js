const User = require("../models/user.model");
const JwtTokenService = require("./jwt.service");

// Default Response For Login And Register
exports.defaultResponse = async (request) => {
  const { email } = request.body;
  const user = await User.findOne({ email });
  const accessToken = JwtTokenService.createAccessToken(user.id, user.role);
  const refreshToken = JwtTokenService.createRefreshToken(user.id, user.role);
  user.setJwtTokens(accessToken, refreshToken);
  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

// Get User By Id
exports.getUserRoleById = async (id) => {
  const { role } = await User.findById(id).select("role");
  return role;
};
