import Logout from "./user_logout";
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react'



const Dashboard = () => {
    const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/message');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    return (
      <div>
        <h2>Dashboard</h2>
        <p>Welcome to the dashboard!</p>
        <Logout />
      </div>
    );
  };

  export default Dashboard;
  