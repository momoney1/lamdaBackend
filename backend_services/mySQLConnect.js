const AWS = require('aws-sdk');
const express = require('express');
const mySql2 = require('mysql2/promise');
const mySql = require('mysql');
const bluebird = require('bluebird');
const dotenv = require('dotenv');


AWS.config.update({
    region: 'us-east-1'
})


  /*async function selectAllDrinkFlavors(){
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
  const getAllFlavors = selectAllDrinkFlavors();
  getAllFlavors.then(function(result){
    console.log(result)
  })


  async function selectAllDrinkIngredients(){
    const db = await mySql2.createConnection({
        host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
        user: 'wsadmin',
        password: 'KMMAG_dddb',
        database: 'drinkdish',
        Promise: bluebird
    })

    const [rows, fields] = await db.execute('SELECT * FROM drinkdish.Drink_Ingredient')
    //console.log(rows);
    return rows;

  }
  const getAllDrinkIngredients = selectAllDrinkIngredients();
  getAllDrinkIngredients.then(function(result){
    console.log(result)
  }) 


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

  */

  async function selectUser(first_name, last_name){
    const db = await mySql2.createConnection({
        host: 'aws-drinkdish.ci8ixqjembek.us-east-2.rds.amazonaws.com',
        user: 'wsadmin',
        password: 'KMMAG_dddb',
        database: 'drinkdish',
        Promise: bluebird
    })

    const [rows, fields] = await db.execute('SELECT * FROM drinkdish.User WHERE firstname = ? AND lastname = ?', [first_name, last_name])
    //console.log(rows);
    return rows;

  }
  const getUserInfo = selectUser('john', 'Smith');
  getUserInfo.then(function(result){
    console.log(result)
  })
  

  

  //module.exports.getAlldishes = getAllDishes
  //module.exports.getAllFlavors = getAllFlavors
 // module.exports.getAllDrinkIngredients = getAllDrinkIngredients
  //module.exports.getByDrinkCategory = getByDrinkCategory



  //console.log(flavors)
  
  


 //const drinkTypes = await db.query("SELECT * FROM Drink_Type")


    /*db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });*/



