const { OAuth } = require('../dataBase');
const { responseCodes, usersConst: { AUTHORIZATION }, responseCodes: { BAD_REQUEST } } = require('../const');
const { ErrorHandler } = require('../error');
const { NO_TOKEN, WRONG_TOKEN, RECORD_NOT_FOUND_BY_PARAM } = require('../error/error-messages');
const { AuthHasher } = require('../helpers');
const { passwordHasher } = require('../helpers');

module.exports = {
    checkPasswordLogin: async (req, res, next) => {
        try {
            const { password: hashPassword } = req.user;
            const { password } = req.body;

            if (!req.user) {
                throw new ErrorHandler(BAD_REQUEST, RECORD_NOT_FOUND_BY_PARAM.massage,
                    RECORD_NOT_FOUND_BY_PARAM.code);
            }

            await passwordHasher.compare(hashPassword, password);
            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = responseCodes.ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(responseCodes.NO_TOKEN, NO_TOKEN.massage, NO_TOKEN.code);
            }

            await AuthHasher.verifyToken(token, tokenType);

            const tokenObject = await OAuth.findOne({ [tokenType]: token });

            if (!tokenObject) {
                throw new ErrorHandler(responseCodes.WRONG_TOKEN, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            req.user = tokenObject.user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
