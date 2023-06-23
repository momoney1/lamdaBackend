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
import {Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute';
import { Amplify, Auth } from 'aws-amplify';

/*Amplify.configure({
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
      console.log(' error message when trying to authenticate'+ error);
      // Redirect to the login page if not authenticated
      // You can use the useNavigate hook or history.push() method to navigate here
      // For simplicity, assume the login page is '/login'
      // Example: useNavigate('/login');
      // Or: history.push('/login');
    }
  };
 */
  const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      try {
        await axios.post('http://localhost:4000/register', { username, password });
        console.log('User registered successfully');
        // Handle success, e.g., show a success message or redirect to login page
      } catch (error) {
        console.error('Error registering user: ', error);
        // Handle error, e.g., show an error message
      }
    };
  
    const handleLogin = async () => {
      try {
        await axios.post('http://localhost:4000/login', { username, password });
        console.log('Login successful');
        // Handle success, e.g., store authentication token or redirect to dashboard
      } catch (error) {
        console.error('Error logging in: ', error);
        // Handle error,
      }
    };
  
  return (
      
    <div>
    <h1>User Registration</h1>
    <form>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={handleRegister}>
        Register
      </button>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  </div>

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

 */


