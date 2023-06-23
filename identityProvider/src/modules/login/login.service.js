const {
    passwordService,
    tokenService
} = require('../shared/services');

module.exports.loginService = {
  loginUser: (userDetails) => {
    const threeMin = '180';
    const tenMin = '600';
    const {username, email, password} = userDetails;
    // Get hashed password from database
    const hashedPassword = passwordService.encryptPassword(password);
    if (!passwordService.verifyPassWord(password, hashedPassword)) {
        return Promise.reject()
    }
    const accessToken = tokenService.createToken({username}, threeMin);
    const refreshToken = tokenService.createToken({username}, tenMin);

    return Promise.resolve({accessToken, refreshToken})
  }
}