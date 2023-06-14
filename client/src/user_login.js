import axios from 'axios';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import React, {useState, useRef, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import userPoolInfo from './user_pool';
import  {AccountContext} from './user_account'; 
 //import { userAuthentication } from '../Context/authenticationContext';


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

   //const authenticate  = useContext(AccountContext);
    //const navigate = useNavigate();
   // const {login} = userAuthentication();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const user = new CognitoUser({
          UserName: email,
          Pool: userPoolInfo,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            console.log("onSuccess: ", data);
          },
          onFailure: (error) => {
            console.log("onFailure :", error);
          },
          newPasswordRequired: (data) => {
            console.log("newPasswordRequired: ", data);
          }
        })
            
    }
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