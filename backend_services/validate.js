const util = require('./Utility/utility');
const authentication = require('./Utility/authentication');

function validate(requestBody){
    if(!requestBody.user || !requestBody.user.username || !requestBody.token){
        return util.buildResponse(401, {
            validated: false,
            message: 'request body is incorrect'
        })
    }

    const user = requestBody.user;
    const token = requestBody.token;
    const validation = authentication.validateToken(user.username, token);
    if(!validation.validate) {
        return util.buildResponse(401, validation);
    }

    return util.buildResponse(200, {
        validated: true,
        message: 'successful',
        user: user,
        token: token
    })
}

module.exports.validate = validate;
