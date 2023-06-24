const {
    fetchAllScores
} = require('../../database/resourceApiDAL');

module.exports.scoresService = {
    fetchAllScores: () => {
        return fetchAllScores()
        .then((data) => {
            return data;
        });
    }
}