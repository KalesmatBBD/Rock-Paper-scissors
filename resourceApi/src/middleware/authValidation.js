const {
    tokenService
} = require('../modules/shared/services');

module.exports = {
    auth: (req, res, next) => {
        const { accesstoken, refreshtoken } = req.headers
        try {
            const tokenData = tokenService.verifyToken(accesstoken);
            if (tokenData.aud === 'RSP_API' && tokenData.iss === 'RPS_ID') {
                res.locals.user = tokenData.user;
            }
            throw new Error('Invalid Creds')
        } catch (error) {
            res.locals.user = null;
        }
        next();
    }
}