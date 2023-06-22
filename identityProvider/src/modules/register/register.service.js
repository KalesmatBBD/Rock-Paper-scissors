const {
    passwordService
} = require('../shared/services');

module.exports.registerService = {
    registerUser: (userDetails) => {
        const {username, email, password} = userDetails;
        const hashedPassword = passwordService.encryptPassword(password);
        return Promise.resolve();
    }
}