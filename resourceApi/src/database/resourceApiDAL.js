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

async function postScore(username, state) {
    try {
      const pool = await sql.connect(dbConfig);
      let query;
  
      if (state === 'win') {
        query = `UPDATE Score SET wins = wins + 1 WHERE username = @username`;
      } else if (state === 'loss') {
        query = `UPDATE Score SET losses = losses + 1 WHERE username = @username`;
      } else {
        throw new Error('Invalid state provided');
      }
  
      const request = pool.request();
      request.input('username', sql.VarChar, username);
  
      await request.query(query);
      sql.close();
    } catch (error) {
      console.log('Original Error:', error);
      throw error;
    }
  }

  async function createPlayer(username) {
    try {
      const pool = await sql.connect(dbConfig);
      let query;
      query = `INSERT INTO Score (username, wins, losses)
        OUTPUT inserted.username
        VALUES (@username, @wins, @losses);`
      request.input('username', sql.VarChar, username);
      request.input('wins', sql.Int, 0);
      request.input('losses', sql.Int, 0);
  
      const request = pool.request();
  
      const result = await request.query(query);
      return result.recordset[0]
      sql.close();
    } catch (error) {
      console.log('Original Error:', error);
      throw error;
    }
  }


  
module.exports = {
    fetchAllScores,
    postScore,
    createPlayer
};