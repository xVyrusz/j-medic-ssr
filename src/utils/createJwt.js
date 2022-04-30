const { config } = require('../config/index');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign(user, config.jwt_secret, {
    expiresIn: '15m'
  });

  return token;
};

const refreshToken = (user) => {
  const token = jwt.sign(user, config.jwt_secret, {
    expiresIn: '1y'
  });

  return token
};

module.exports = {
  createToken,
  refreshToken
};