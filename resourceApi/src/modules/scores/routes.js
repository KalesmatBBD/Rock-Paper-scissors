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
    .catch((error) => {
      return res.status(500).json({error});
    })
});


scoresRouter.post("/postScore", (req, res) => {
  return scoresService.postScore(req.body)
  .then(() => {
    res.status(200).json({});
  })
  .catch((error) => {
    return res.status(500).json({error});
  })
});

module.exports = {
  scoresRouter
}