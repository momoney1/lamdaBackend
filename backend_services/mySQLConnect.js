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



