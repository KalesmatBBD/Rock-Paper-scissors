const {
    fetchAllScores,postScore
} = require('../../database/resourceApiDAL');

module.exports.scoresService = {
    fetchAllScores: () => {
        return fetchAllScores()
        .then((data) => {
            return data;
        });
    },

    postScore: async (scoreDetails) => {
        try{
        const {username, wins,losses} = scoreDetails;
        await postScore(username,wins,losses);
        }catch(error){
            throw error;
        }
    }
}
