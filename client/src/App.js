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
import {Link, useNavigate, redirect, useLocation } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import  Switch from 'react-router'



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
  const LoginForm = ({ handleRegister, handleLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      handleLogin(username, password);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
  
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
        />
              <button type="submit">Login</button>
      </form>
    );
  };

  const App = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
    const handleRegister = async (username, password) => {
      try {
        await axios.post('http://localhost:4000/register', { username, password });
        console.log('User registered successfully');
        // Handle success, e.g., show a success message or redirect to login page
      } catch (error) {
        console.error('Error registering user: ', error);
        // Handle error, e.g., show an error message
      }
    };
  
    const handleLogin = async (username, password) => {
      try {
        await axios.post('http://localhost:4000/login', { username, password });
        setIsLoggedIn(true);
        console.log('Login successful');
        // Handle success, e.g., store authentication token or redirect to dashboard
        navigate('/search_bars');
      } catch (error) {
        console.error('Error logging in: ', error);
        // Handle error,
      }
    };
  
  return (
      
    <div>
      <h1>User Registration and Login</h1>
      {!isLoggedIn ? (
        <LoginForm handleRegister={handleRegister} handleLogin={handleLogin} />
      ) : (
        
          <Routes>
            <Route path="/search_bars" element={<SearchBar />} />
          </Routes>
        
      )}
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


