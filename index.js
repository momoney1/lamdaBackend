const express = require('express');
const AWS = require('aws-sdk');
const mySql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');

const registrationService = require('./backend_services/registration');
const loginService = require('./backend_services/login');
const validationService = require('./backend_services/validate');
const util = require('./backend_services/Utility/utility');

/*const healthcheck = 'health';
const userRegistration = 'registration';
const userLogin = 'login';
const verify = 'validate';*/

//app.use(express.json());

var app = express();

app.get('/message', (req, res) => {
    res.json({ message: "Hello Mr Moe from server!" });
    console.log('hello Mr Moe from server');
});

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true,
    })
)

app.listen(4000, () => {
    console.log("Moe's new Project on port 4000");
})

/*module.exports   = async function(event) {
    console.log('Request Event:', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthcheck:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registration:
            const registerBody = JSON.parse(event.body);
            response = await registrationService.register(registerBody);
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === login:
            const loginBody = JSON.parse(event.body);
            response = loginService.login(200);
            break;
        case event.httpMethod === 'POST' && event.path === validate:
            const validateBody = JSON.parse(event.body);
            response = validationService.validate(validateBody);
            break;
        default:
                response = util.buildResponse(404, '404 NOT FOUND ERROR');
    }
};


//https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest

exports.handler = async (event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        let data = JSON.parse(event.body);
        
        if (typeof data.name === 'undefined') {
            return sendRes(404, '{ error: true, message: "Hello World!." }');
        }
        
        return sendRes(200, '{ "error": false, "message": "Hello "' + data.name + '" }');
    }    
    
    return sendRes(404, '{ error: true, message: "Hello World!." }');
};
const sendRes = (status, body) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: body
    };
    return response;
};*/

exports.handler = (event, context, callback) => {
    console.log("Processing...");
    console.log("testing Moe's lamda function call");
    const params = {
        Item: {
            date: Date.now(),
            message: event.key1
        }
    };
    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify('Hello from new Lambda!'),
  };
    
    docClient.put(params, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    })
};


