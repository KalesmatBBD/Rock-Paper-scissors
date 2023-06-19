const playerRouter = require('express').Router();
const {
  playerService,
} = require('./player.service');

playerRouter.post('', (req, res) => {
  res.status(200).json({})
});

module.exports = {
  playerRouter
}