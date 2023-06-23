const Joi = require('joi');

const loginForm = Joi.object({
    username: Joi.string().trim().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    ).required(),
    password: Joi.string().trim().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ).required(),
});

module.exports = {
    validateBody: (req, res, next) => {
        const body = req.body
        const result = loginForm.validate(body, { stripUnknown: true, abortEarly: false });
        if (result.error) {
            return res.status(400).json({reason: 'Invalid request'});
        }
        next()
    }
}