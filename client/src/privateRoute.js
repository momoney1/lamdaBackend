import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = async () => {
    try {
      // Check if the user is authenticated using AWS Amplify
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        // Redirect to the login page if not authenticated
        // You can use the useNavigate hook or history.push() method to navigate here
        // For simplicity, assume the login page is '/login'
        // Example: useNavigate('/login');
        // Or: history.push('/login');
      }
    });
  }, []);

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
