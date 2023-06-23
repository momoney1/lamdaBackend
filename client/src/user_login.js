import axios from 'axios';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import {Link, useNavigate, Route, redirect, useLocation } from 'react-router-dom'
import userPoolInfo from './user_pool';
import {Auth} from 'aws-amplify'
import  {AccountContext} from './user_account'; 
import AWS from 'aws-sdk';

AWS.config.logger = console;
AWS.config.debug = true;


const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('logging before Auth.signIn');
      await Auth.signIn(email, password, { debug: 'true' });
      console.log('Logging after Auth.signIn');
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from.pathname);
    } catch (error) {
      console.log('Login error: ', error);
    }
  };
  return (
    <div className="container">
        <h2>User Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange = {(e) => setEmail(e.target.value)} type='email' name='email' placeholder='Email'/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='Password'/>
            </div>
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}


export default UserLogin;