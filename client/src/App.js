import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import React, { Component } from 'react';
import axios from 'axios';

/*export function App() {
  const [message, setMessage] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}*/
//https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest
class App extends Component {
  componentDidMount() {
    const api = 'https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest';
    const data = { "name" : "Moe" };
    axios
      .post(api, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  render() {
    return (
      <div>Medium Tutorial</div>
    );
  }
}

export default App;
