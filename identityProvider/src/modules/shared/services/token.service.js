const jwt = require('jsonwebtoken');
const config = require('config');
const fs = require("fs");

const key = fs.readFileSync(config.identityProvider.key)

module.exports.tokenService = {
  createToken: (user, time) => {
    return jwt.sign(
      {
        user
      },
      key,
      {
        algorithm: 'RS256',
        expiresIn: time,
        audience: 'RPS_API',
        issuer: 'RPS_ID',
      }
    );
  }
}