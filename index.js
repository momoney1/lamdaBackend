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

app.get('/v1/Drinks', async (req, res) =>{
    //const drinks = await dbConection.getAllDrinkIngredients()
    //res.send(drinks)
    async function selectAllDrinkIngredients(){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Ingredient')
        console.log(rows);
        return rows;
    
      }
    //res.json({ message: "Drinks retrieved" });
})

app.get('/v1/Dishes', async (req, res) =>{
    //const dishes = await dbConection.getAllDishes()
    //res.send(dishes)
    async function selectAllDishes(){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Dish')
        //console.log(rows);
        return rows;
    
      }
      const getAllDishes = selectAllDishes();
      getAllDishes.then(function(result){
        console.log(result)
      }) 
})

app.get('/v1/Drink_Flavors', async (req, res) =>{
    //const flavors = await dbConnection.getAllFlavors()
    //res.send(flavors)
    async function selectAllDrinkFlavors(){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Flavor')
        //console.log(rows);
        return rows;
    
      }
      const getAllDrinkFlavors = selectAllDrinkFlavors();
      getAllFlavors.then(function(result){
        console.log(result)
      })
})

app.get('/v1/Drink_Category', async (req, res) =>{
    //const drink_category = await dbConnection.getByDrinkCategory()
    //res.send(drink_category)
    async function selectByDrinkCategory(type_name){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Category WHERE drink_category_name = ?', [type_name])
        //console.log(rows);
        return rows;
    
      }
      const getByDrinkCategory = selectByDrinkCategory('Tea');
      getByDrinkCategory.then(function(result){
        console.log(result)
      })
})

app.get('/v1/flavor-pairings', async (req, res) => {
    async function selectFlavorPairings(){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Flavor_Pairing')
        //console.log(rows);
        return rows;
    
      }
      const getFlavorPairings = selectFlavorPairings();
      getFlavorPairings.then(function(result){
        console.log(result)
      })
})

app.get('/v1/drink-for-dish/dish-name', async (req, res) => {
    async function selectDrinksForDish(dish_flavor_id){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Flavor_Pairing WHERE dish_flavor_id = ?', [dish_flavor_id])
        //console.log(rows);
        return rows;
    
      }
      const getDrinksForDish = selectDrinksForDish('12');
      getDrinksForDish.then(function(result){
        console.log(result)
      })
})

app.get('/v1/dishes-for-drink/drink-name', (req, res) => {
    async function selectDishesForDrink(drink_flavor_id){
        const db = await mySql2.createConnection({
            host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
            user: 'wsadmin',
            password: 'KMMAG_dddb',
            database: 'drinkdish',
            Promise: bluebird
        })
    
        const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Flavor_Pairing WHERE drink_flavor_id = ?', [drink_flavor_id])
        //console.log(rows);
        return rows;
    
      }
    
      const getDishesForDrink = selectDishesForDrink('1')
      getDishesForDrink.then(function(result){
        console.log(result)
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