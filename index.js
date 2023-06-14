const express = require('express');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const mySql2 = require('mysql2');
const mySql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
const registrationService = require('./backend_services/mySQLConnect');
const loginService = require('./backend_services/login');
const validationService = require('./backend_services/validate');
const util = require('./backend_services/Utility/utility');
const dbConection = require('./backend_services/mySQLConnect');


var app = express();
var mylamda = new AWS.Lambda();
const { LambdaClient, AddLayerVersionPermissionCommand } = require("@aws-sdk/client-lambda");
const client = new LambdaClient({ region: "REGION" });


var params = {
    FunctonName : 'drinkDishTest',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({key: 'value'})
};

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true,
    })
)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error!')
})

app.get('/', (req, res) =>{
    res.json({ message: "Hello Mr Moe from backend entrypoint!" });
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello Mr Moe from message endpoint!" });
    console.log('hello Mr Moe from server');
    mylamda.invoke(params).promise();
    console.log('lamda call successfull!');
});

const db =  mySql2.createConnection({
    host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
    user: 'wsadmin',
    password: 'KMMAG_dddb',
    database: 'drinkdish',
    Promise: bluebird
})
console.log('connected         from index js');


app.get('/v1/Drinks', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Drink';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/Dishes', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Dish';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/Drink_Flavors', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Drink_Flavor';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/Drink_Category', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Drink_Category';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/flavor-pairings', async (req, res) => {
    const sqlQuery = 'SELECT * FROM drinkdish.Flavor_Pairing';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/drink-for-dish', async (req, res) => {
    const userInput = req.body.dish_name;
    const sqlQuery = `SELECT * FROM drinkdish.Flavor_Pairing WHERE dish_flavor_id = '${userInput}'`;
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/dishes-for-drink', (req, res) => {
    const userInput = req.body.drink_name;
    const sqlQuery = `SELECT * FROM drinkdish.Flavor_Pairing WHERE drink_flavor_id = '${userInput}'`;
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/admin/users', (req, res) => {
    const sqlQuery = 'SELECT * FROM drinkdish.User';
    db.query(sqlQuery, (err, data) => {
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.listen(4000, () => {
    console.log("Moe's new Project on port 4000");
})




exports.handler = async (event, context, callback) => {
    console.log("Processing...");
    //console.log("here is the first index value in event. "+ event["key1"]);
    const params = {
        Item: {
            date: Date.now(),
            message: event.key1
        },
        TableName: "serverlessApp"
    };
    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify('Hello from new Lambda! we are good to go'),
  };
    console.log(response);

};

/* docClient.put(params, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    })*/