const jwt = require('jsonwebtoken');


function createToken(userInfo){
    if(!userInfo){
        return null;
    }

  

    return jwt.sign(userInfo, 'mySecret', {
        expiresIn: "1 hour"
    })
}

function validateToken(username, token){
    return jwt.verify(token, 'myJWTSecret', (error, response) => {
        if(error){
            return {
                validated: false,
                message: 'token is invallid'
            }
        }
        if(response.username !== username){
            return {
                validated: false,
                message: 'username is invalid'
            }
        }

        return {
            validated: true,
            message: 'user is validated'
        }
    })
}

module.exports.createToken = createToken;
module.exports.validateToken = validateToken;