const registerRouter = require('express').Router();
const {
  registerService,
} = require('./register.service');
const {
  validateBody
} = require('../../middleware/registerValidation');

registerRouter.post('', validateBody, (req, res) => {
  console.log(req.body);
  return registerService.registerPlayer(req.body)
    .then(() => {
      res.status(200).json({registered: true});
    })
    .catch(() => {
      return res.status(500).json({error: ''});
    })
});

module.exports = {
  registerRouter
}