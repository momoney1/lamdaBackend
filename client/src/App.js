import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Registration  from './user_registration';
import UserLogin from './user_login'; 
import Dashboard from './dashboard';
import SearchBar from './searh_bars';
import  { UserAccount } from './user_account';
import Status from './Status';
import {Routes, Route} from 'react-router-dom'
import PrivateRoute from './privateRoute';
import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    UserPoolId: 'us-east-1_GgidSg7RH',
    userPoolWebClientId: '7ftmd0ihnjnr497gddf2gon4oj'
  },
});

const App = () => {

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check the current user's authentication state
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      // Redirect to the login page if not authenticated
      // You can use the useNavigate hook or history.push() method to navigate here
      // For simplicity, assume the login page is '/login'
      // Example: useNavigate('/login');
      // Or: history.push('/login');
    }
  };
  //https://cors-anywhere-herokuapp.com/https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest/api
  
  /*useEffect(() => {
    alert("Component Rendered")
    async function axiosFetch(){
      await axios.get('http://localhost:4000/message',
      {headers: {  // place lamda function inside "app.get" in index.js file
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
     } })
      .then(res => {
        console.dir(res.status);
        console.log("successful call to backend");
      });
      
    }

    axiosFetch();

  });*/
  
  return (
      <Routes>
        <Route path="/user_registration" element={<Registration/>} />
        <Route path="/search_bars" element={<SearchBar/>} />
        <Route path="/user_login" element={<UserLogin/>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/"/>
      </Routes>
    
  )
}

export default App;


/*
  

  async handleSubmit(event) {
    const instance = axios.create(
      {
              baseURL:'https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest/api/drinkDishTest',
              withCredentials: false,
              headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
            }
        })
    event.preventDefault();
    const { name, message } = this.state;
    const response = await axios.post(
      instance,
      { key1: `${name}, ${message}` }
    );
    console.log(response.data + '  finally your call works Mr Moe');
  }

 */


