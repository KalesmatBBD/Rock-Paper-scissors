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
        const {username, score} = scoreDetails;
        await postScore(username,score);
        }catch(error){
            throw error;
        }
    }
}
