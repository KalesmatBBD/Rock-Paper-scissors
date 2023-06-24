const scoresRouter = require("express").Router();
const { scoresService } = require("./scores.service");
const sql = require("mssql");
const config = require("config");
const resourceApiConfig = config.resourceApi;

scoresRouter.get('', (req, res) => {
  res.status(200).json({})
});

scoresRouter.get("/getScores", async (req, res) => {
  const statement = "select * from score ORDER BY Score DESC";
  try {
    let pool = await sql.connect(resourceApiConfig.dbConfig);
    const request = pool.request();
    request.query(statement, (err, result) => {
      console.dir(result);
      res.send(result);
    });
  } catch (err) {
    console.error("Error retrieving data:", err);
    throw err;
  }
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