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


scoresRouter.post("/postScore", async (req, res) => {
  const { userName, score } = req.body; 

  const query = `UPDATE score SET Score = ${score} WHERE UserName = '${userName}'`;

  try {
    let pool = await sql.connect(resourceApiConfig.dbConfig);
    const request = pool.request();
    request.query(query, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).json({ error: "An error occurred while updating data in the database." });
      } else {
        console.dir(result);
        res.status(200).json({ message: "Score updated successfully." });
      }
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
});

module.exports = {
  scoresRouter
}