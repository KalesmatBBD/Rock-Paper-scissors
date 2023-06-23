const {
    passwordService
} = require('../shared/services/password.service');

module.exports.registerService = {
    registerPlayer: (playerDetails) => {
        const {username, email, password} = playerDetails;
        const hashedPassword = passwordService.encryptPassword(password);
        return Promise.resolve();
    }
}