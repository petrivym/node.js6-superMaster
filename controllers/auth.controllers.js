const { DELETE, CREATED_OR_UPDATE } = require('../const/response-codes.enum');
const { AUTHORIZATION } = require('../const/users.const');
const { OAuth } = require('../dataBase');
const { AuthHasher } = require('../helpers');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const tokePair = AuthHasher.generateTokenPair();

            await OAuth.create({
                ...tokePair,
                user: _id
            });

            res.json({
                ...tokePair,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await OAuth.remove({ accessToken: token });

            res.status(DELETE).json('Success');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const { _id } = req.user;

            await OAuth.remove({ refreshToken: token });

            const tokePair = AuthHasher.generateTokenPair();

            await OAuth.create({
                ...tokePair,
                user: _id
            });

            res.status(CREATED_OR_UPDATE).json({ ...tokePair });
        } catch (e) {
            next(e);
        }
    }
};
