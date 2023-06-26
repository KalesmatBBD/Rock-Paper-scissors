const {
    createPlayer
} = require('../../database/resourceApiDAL');

module.exports.registerService = {
    createPlayer:(user) => {
        if (user && user.username) {
            return createPlayer(user.username)
        }
        return Promise.reject({code: 400})
    }
}