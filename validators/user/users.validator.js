const Joi = require('joi');

const { usersRolesEnum } = require('../../const');

const { regexp } = require('../../const');

module.exports = {
    createUser: Joi.object().keys({
        login: Joi.string().required().min(3).max(20),
        email: Joi.string().required().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().required().regex(regexp.PASSWORD_REGEXP),
        role: Joi.string().allow(...Object.values(usersRolesEnum))
    }),

    updateUser: Joi.object().keys({
        email: Joi.string().required().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().required().regex(regexp.PASSWORD_REGEXP),
        login: Joi.string().min(3).max(20),
        role: Joi.string().allow(...Object.values(usersRolesEnum))
    }),
};
