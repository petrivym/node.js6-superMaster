const bcrypt = require('bcrypt');

const { ErrorHandler, errorM } = require('../error');
const { WRONG_EMAIL_OR_PASSWORD } = require('../const/response-codes.enum');

module.exports = {
    compare: async (hashedPassword, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD, errorM.WRONG_PASSWORD.massage,
                errorM.WRONG_PASSWORD.code);
        }
    },
    hash: (password) => bcrypt.hash(password, 10)
};
