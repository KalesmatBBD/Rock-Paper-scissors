const registerRouter = require('express').Router();
const {
  registerService,
} = require('./register.service');

const {
  auth
} = require('../../middleware/authValidation');

registerRouter.post('', auth, (req, res) => {
  const user = res.locals.user;
  return registerService.createPlayer(user)
    .then(() => {
      res.status(200).json({})
    })
    .catch(error => {
      if(error.code && error.code === 400) {
        return res.status(400).json({})
      }
      return res.status(500).json({message: 'Internal error.'})
    })
});

module.exports = {
  registerRouter
}