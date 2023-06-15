import React from 'react';
import {Route, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out the user using AWS Cognito
      await Auth.signOut();

      // Redirect the user to the login page
      navigate('/user_login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
