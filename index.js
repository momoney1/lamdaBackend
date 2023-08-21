const express = require('express');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const mySql2 = require('mysql2');
const mySql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
const registrationService = require('./backend_services/mySQLConnect');
//const loginService = require('./backend_services/login');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.json({ message: "Hello Mr Moe from backend entrypoint!" });
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello Mr Moe from message endpoint!" });
    console.log('hello Mr Moe from server');
    //mylamda.invoke(params).promise();
});

const db =  mySql2.createConnection({
    host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
    user: 'wsadmin',
    password: 'KMMAG_dddb',
    database: 'drinkdish',
    Promise: bluebird
})
console.log('connected         from index js');

app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Validate the request body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // Insert the user into the database
    const query = 'INSERT INTO User (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Error registering user: ', error);
        return res.status(500).json({ message: 'Error registering user' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Validate the request body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // Check if the username and password match the records in the database
    const query = 'SELECT * FROM User WHERE username = ? AND password = ?';
    db.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Error logging in: ', error);
        return res.status(500).json({ message: 'Error logging in' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
  
      return res.status(200).json({ message: 'Login successful' });
    });
  });

// test version of function, only retrieve first 10 rows:  /'SELECT * FROM drinkdish.Drink WHERE drink_id < 11
app.get('/v1/Drinks', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Drink';   
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/Drink-Name', (req, res) => {
    const userInput = req.body.drinkName;
    const sqlQuery = `SELECT * FROM drinkdish.Drink WHERE drink_name = '${userInput}'`;
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(req.body.drinkName, " backend data body");
        console.log('Returned data:', data);
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

app.post('/v1/Dish-Name', (req, res) => {
    const userInput = req.body.dishName;
    console.log(req.body.dishName + " is the name of the dish")
    const sqlQuery = `SELECT * FROM drinkdish.Dish WHERE dish_name = '${userInput}'`;
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/Dish-Flavor-Name', (req, res) => {
    const userInput = req.body.dishFlavorName;
    console.log(userInput + " is the name of the dish");
    
    const sqlQuery = `
        SELECT
            dc.dish_category_name AS dish_category_name,
            dr.drink_category_name AS drink_category_name
        FROM
            drinkdish.Dish_Flavor df
        INNER JOIN drinkdish.Category_Pairing cp ON df.dish_flavor_id = cp.dish_category_id
        INNER JOIN drinkdish.Dish_Category dc ON cp.dish_category_id = dc.dish_category_id
        INNER JOIN drinkdish.Drink_Category dr ON cp.drink_category_id = dr.drink_category_id
        WHERE
            df.dish_flavor_name = ?;
    `;

    db.query(sqlQuery, [userInput], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.json('Error try again');
        }
        console.log(data);
        return res.json(data);
    });
});

app.post('/v1/Dish-To-Drink-Pairing', (req, res) => {
    const userInput = req.body.dishToDrinkName;
    console.log(userInput + " is the name of the dish");
    
    const sqlQuery = `
        SELECT d.drink_name
        FROM drinkdish.Drink d
        JOIN drinkdish.DishToDrinkMapping dtm ON d.drink_id = dtm.drink_id
        JOIN drinkdish.Dish_Flavor df ON dtm.dish_id = df.dish_flavor_id
        JOIN drinkdish.Dish di ON df.dish_flavor_id = di.dish_id
        WHERE di.dish_name = ?;
    `;

    db.query(sqlQuery, [userInput], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.json('Error try again');
        }
        console.log(data);
        return res.json(data);
    });
});

app.get('/v1/Drink_Flavors', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Drink_Flavor';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.get('/v1/Dish_Category', async (req, res) =>{
    const sqlQuery = 'SELECT * FROM drinkdish.Dish_Category';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/match-drink-ingredient', (req, res) => {
      const { drink_ingredient_name } = req.body.drinkIngredientName; 
      console.log(req.body + " req body from ingredient name");
      const sqlQuery = `
        SELECT dp.flavor_pairing_id, di.drink_ingredient_name, di.drink_ingredient_id, di.dish_ingredient_name, di.dish_ingredient_id
        FROM drinkdish.Flavor_Pairing dp
        INNER JOIN drinkdish.Dish_Ingredient di ON dp.dish_flavor_id = di.dish_ingredient_id
        INNER JOIN drinkdish.Drink_Ingredient di2 ON dp.drink_flavor_id = di2.drink_ingredient_id
        WHERE di2.drink_ingredient_name = ?
      `;
      db.query(sqlQuery, [drink_ingredient_name], (err, data) => {
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
      });
      
  });

  app.get('/v1/match-dish-ingredient', async (req, res) => {
    const { dish_ingredient_name } = req.body; 
    const sqlQuery = `
      SELECT dp.flavor_pairing_id, di.drink_ingredient_name, di.drink_ingredient_id, di.dish_ingredient_name, di.dish_ingredient_id
      FROM drinkdish.Flavor_Pairing dp
      INNER JOIN drinkdish.Dish_Ingredient di ON dp.dish_flavor_id = di.dish_ingredient_id
      INNER JOIN drinkdish.Drink_Ingredient di2 ON dp.drink_flavor_id = di2.drink_ingredient_id
      WHERE di2.dish_ingredient_name = ?
    `;
    db.query(sqlQuery, [dish_ingredient_id], (err, data));
    if(err) return res.json('Error try again');
      console.log(data);
      return res.json(data);
}); 

app.post('/v1/rating', (req, res) => {
    const { user_rating, user_id, ingredient_pairing, rating } = req.body;
  
    // Assuming you have set up a database connection named 'db' to perform queries
    const sqlQuery = `
      INSERT INTO drinkdish.User_Rating (user_rating, user_id, ingredient_pairing, rating)
      VALUES (?, ?, ?, ?)
    `;
  
    // Assuming you have configured the database query to handle prepared statements or use an ORM
    db.query(sqlQuery, [user_rating, user_id, ingredient_pairing, rating], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json('Error inserting data');
      }
  
      // Successful insert
      return res.status(200).json('Rating inserted successfully');
    });
  });


app.get('/v1/flavor-pairings', async (req, res) => {
    const sqlQuery = 'SELECT * FROM drinkdish.Flavor_Pairing';
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        return res.json(data);
    })
})

app.post('/v1/drinks-for-dish', async (req, res) => {
    const userInput = req.body.dish_name;
    const sqlQuery = `SELECT drink_flavor_id FROM drinkdish.Flavor_Pairing WHERE dish_flavor_id = '${userInput}'`;
    db.query(sqlQuery, (err, data) =>{
        if(err) return res.json('Error try again');
        console.log(data);
        console.log(userInput + "    dish name ");
        return res.json(data);
    })
})

app.post('/v1/dishes-for-drink', (req, res) => {
    const userInput = req.body.drink_name;
    const sqlQuery = `SELECT dish_flavor_id FROM drinkdish.Flavor_Pairing WHERE drink_flavor_id = '${userInput}'`;
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