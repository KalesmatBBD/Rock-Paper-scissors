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
      res.set('Authorization', 'Bearer '+ accessToken)
      res.set('RefreshToken', refreshToken)
      res.header("Access-Control-Expose-Headers","Authorization");
      res.status(200).json({})
    })
});

module.exports = {
  loginRouter
}