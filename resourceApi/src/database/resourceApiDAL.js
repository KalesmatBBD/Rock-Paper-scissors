const sql = require("mssql");
const config = require('config');

const dbConfig = config.resourceApi.dbConfig;

async function fetchAllScores() {
  try {
    const pool = await sql.connect(dbConfig);
    const query =
      "SELECT username,wins, losses, ROUND(((wins*1.0/losses)*(wins+losses)),2) as score FROM Score ORDER BY score DESC";
    const request = new sql.Request();
    const result = await request.query(query);
    sql.close();
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

async function postScore(username,wins,losses){
    
    try {
      const pool = await sql.connect(dbConfig);
      const query = `UPDATE Score SET wins = @wins, losses =@losses WHERE username =@username`;

      const request = pool.request();
      request.input('username', sql.VarChar, username);
      request.input('wins', sql.Int, wins);
      request.input('losses', sql.Int, losses);
      
      await request.query(query);
      sql.close();

  } catch (error) {
    console.log('Original Error:', error);
      throw error;
  }
}

module.exports = {
    fetchAllScores,
    postScore,
};