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

async function fetchUserScore(username){
    
    try {
      const pool = await sql.connect(dbConfig);
      const query = `SELECT username, wins, losses FROM score WHERE username =@username`;

      const request = pool.request();
      request.input('username', sql.VarChar, username);
      
      const result = await request.query(query);
      sql.close();
      return result.recordset;

  } catch (error) {
    console.log('Original Error:', error);
      throw error;
  }
}

async function postScore(username,score){
    
    try {
      const pool = await sql.connect(dbConfig);
      const query = `UPDATE score SET Score = @score WHERE username =@username`;

      const request = pool.request();
      request.input('username', sql.VarChar, username);
      request.input('score', sql.Int, score);
      
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
    fetchUserScore,
};