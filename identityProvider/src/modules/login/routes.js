const loginRouter = require('express').Router();
const {
  loginService,
} = require('./login.service');

const {
  validateBody
} = require('../../middleware/loginValidation');

loginRouter.post('', validateBody, (req, res) => {
  return loginService.loginUser(req.body)
    .then(({accessToken, refreshToken}) => {
      res.header.accessToken = accessToken;
      res.header.refreshToken = refreshToken;
      res.status(200).json({})
    })
});

module.exports = {
  loginRouter
}