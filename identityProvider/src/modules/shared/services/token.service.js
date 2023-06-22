const jwt = require('jsonwebtoken');
const config = require('config');
const fs = require("fs");

const key = fs.readFileSync(config.identityProvider.key)

module.exports.tokenService = {
  createToken: (user, seconds) => {
    return jwt.sign(
      {
        user
      },
      key,
      {
        algorithm: 'RS256',
        expiresIn: seconds,
        audience: 'RPS_API',
        issuer: 'RPS_ID',
      }
    );
  }
}