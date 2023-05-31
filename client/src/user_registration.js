import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
//import {Form, Button, Card } from 'react-bootstrap'
//import { userAuthentication } from '../Context/authenticationContext'
import user_pool from './user_pool.js'

export const UserRegistration = () => {
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
            });*/
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

export default UserRegistration;