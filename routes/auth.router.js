const routerAuth = require('express').Router();
const { controllersAuth } = require('../controllers');
const { EMAIL_FIELD, REFRESH } = require('../const/users.const');
const { userMiddleware, authMiddleware } = require('../middleware');

routerAuth.post('/login', userMiddleware.getUserByDynamicParam(EMAIL_FIELD),
    authMiddleware.checkPasswordLogin, controllersAuth.login);
routerAuth.post('/logout', authMiddleware.checkToken(), controllersAuth.logout);
routerAuth.post('/refresh', authMiddleware.checkToken(REFRESH), controllersAuth.refresh);

module.exports = routerAuth;
