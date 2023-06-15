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



/*export const UserRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const navigate = useNavigate();
    //const {registerUser} = userAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /*const {input_data} = await axios.post("http//localhost:4000/Registration", {
                ...values,
            });
            user_pool.signUp(email, password, [], null, (err, data) => {
                if(err) {
                    console.error(err);
                }
                console.log(data);
            })
        } catch (error) {
            console(error + "  error has occured");
        }
    }
  return (
    <div className="container">
        <h2>User Registration</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type='submit'>Submit</button>
            
        </form>
    </div>
  )
}

export default UserRegistration; */