const sql = require("mssql");
const config = require('config');

const dbConfig = config.resourceApi.dbConfig;

async function fetchAllScores() {
    try {
        await sql.connect(dbConfig);
        const query = "SELECT * FROM score ORDER BY Score DESC";
        const request = new sql.Request();
        const result = await request.query(query);
        await sql.close();
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllScores,
};