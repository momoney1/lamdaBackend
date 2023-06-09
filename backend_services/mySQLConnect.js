const AWS = require('aws-sdk');
const express = require('express');
const mySql2 = require('mysql2/promise');
const mySql = require('mysql');
const bluebird = require('bluebird');
const dotenv = require('dotenv');


AWS.config.update({
    region: 'us-east-1'
})


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

  async function selectAllDrinkTypes(){
    const db = await mySql2.createConnection({
        host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
        user: 'wsadmin',
        password: 'KMMAG_dddb',
        database: 'drinkdish',
        Promise: bluebird
    })

    const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Type')
    //console.log(rows);
    return rows;

  }

  async function selectByDrinkType(type_name){
    const db = await mySql2.createConnection({
        host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
        user: 'wsadmin',
        password: 'KMMAG_dddb',
        database: 'drinkdish',
        Promise: bluebird
    })

    const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Type WHERE drink_type_name = ?', [type_name])
    //console.log(rows);
    return rows;

  }

  const getAllFlavors = selectAllDrinkFlavors();
  getAllFlavors.then(function(result){
    console.log(result)
  })

  const getAllDrinkTypes = selectAllDrinkTypes();
  getAllDrinkTypes.then(function(result){
    console.log(result)
  })

  const getByDrinkType = selectByDrinkType('Tea');
  getByDrinkType.then(function(result){
    console.log(result)
  })
  //console.log(flavors)
  
  


 //const drinkTypes = await db.query("SELECT * FROM Drink_Type")


    /*db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });*/

/*

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
*/

