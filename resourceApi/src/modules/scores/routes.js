const scoresRouter = require("express").Router();
const { scoresService } = require("./scores.service");

scoresRouter.get('', (req, res) => {
  res.status(200).json({})
});

scoresRouter.get("/getScores", async (req, res) => {
  return scoresService.fetchAllScores()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(() => {
      return res.status(500).json({message: 'Internal Error'});
    })
});
scoresRouter.post("", (req, res) => {
  res.status(200).json({});
});

module.exports = {
  scoresRouter
}