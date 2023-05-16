const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'drink-dish-users';
const util = require('./Utility/utility');
const bcrypt = require('bcryptjs');
const authentication = require('./Utility/authentication');

async function login(user){
    const username = user.username;
    const password = user.password;
    if(!user || !username || !password){
        return util.buildResponse(401, {
            message: 'please provide a username and password'
        })
    }

    const dynamoUser = await getUser(username);
    if(!dynamoUser || !dynamoUser.username){
        return util.buildResponse(403, {message: 'invalid username'});
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)){
        return util.buildResponse(403, {message: 'incorrect password, please try again'});
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }

    const token = authentication.createToken(userInfo);
    const response = {
        user: userInfo,
        token: token
    }

    async function getUser(username) {
        const params = {
            TableName: userTable,
            Key: {
                username: username
            }
        }

        return await dynamodb.get(params).promise().then(response => {
            return response.Item;
        }, error => {
            console.error('An error occured', error);
        })
    
    }

    return util.buildResponse(200, response);
}

module.exports.login = login; 