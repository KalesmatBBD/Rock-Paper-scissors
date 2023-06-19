const registerRouter = require('express').Router();
const {
  registerService,
} = require('./register.service');

registerRouter.post('', (req, res) => {
  res.status(200).json({})
});

module.exports = {
  registerRouter
}