const loginRouter = require('express').Router();
const {
  loginService,
} = require('./login.service');

loginRouter.post('', (req, res) => {
  res.status(200).json({})
});

module.exports = {
  loginRouter
}