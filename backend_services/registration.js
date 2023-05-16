const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'drink-dish-users';
const util = require('./Utility/utility');
const bcrypt = require('bcryptjs');

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const userName = userInfo.userName;
    const password = userInfo.password;

    if (!userName || !name || !email || !password) {
        return util.buildResponse(401, {
            message: "All fields required"
        })
    }

    const dynamoUser = await getUser(username);
    if(dynamoUser && dynamoUser.userName) {
    return util.buildResponse(401, {
        message: 'username already exists, try again please'
        })
    }

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
    name: name,
    email: email,
    username: userName.toLowerCase().trim(),
    password: encryptedPassword
    }

    const saveUserResp = await saveUser(user);
    if (!saveUserResp) {
    return util.buildResponse(503, {message: 'Server Error'})
    }

    return util.buildResponse(200, {username: userName});

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

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {console.error('An error occured while saving user: ', error)});
}

module.exports.register = register;