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
scoresRouter.post("", (req, res) => {
  res.status(200).json({});
});

module.exports = {
  scoresRouter
}