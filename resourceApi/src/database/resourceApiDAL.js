const sql = require("mssql");
const config = require('config');

const dbConfig = config.resourceApi.dbConfig;

async function fetchAllScores() {
    try {
        const pool = await sql.connect(dbConfig);
        const query = "SELECT * FROM score ORDER BY Score DESC";
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
      const query = `UPDATE Score SET wins = @wins, losses =@loss WHERE username =@username`;

      const request = pool.request();
      request.input('username', sql.VarChar, username);
      request.input('wins', sql.Int, score);
      request.input('losses', sql.Int, score);
      
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