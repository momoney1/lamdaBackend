import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import user_pool from './user_pool.js'
import {useNavigate} from 'react-router-dom'
import { Auth } from 'aws-amplify';

const Registration = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async event => {
    event.preventDefault();

    try {
      // Register user using AWS Cognito
      await Auth.signUp({
        username,
        password,
      });

      // Redirect user to the login page
      navigate('/user_login');
    } catch (error) {
      console.log('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Registration;
