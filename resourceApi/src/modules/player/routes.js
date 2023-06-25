const playerRouter = require('express').Router();
const {
  playerService,
} = require('./player.service');

playerRouter.post('', (req, res) => {
  res.status(200).json({})
});

playerRouter.get("/getScore", async (req, res) => {
  let name = req.body.user;
  return playerService.fetchUserScore(name)
    .then(data => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json({error});
    })
});

module.exports = {
  playerRouter
}