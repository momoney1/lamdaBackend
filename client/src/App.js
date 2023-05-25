import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import React, { Component } from 'react';
import axios from 'axios';



//https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest/api
export default class Form extends Component {
  //const [message, setMessage] = useState([])
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    const instance = axios.create(
      {
              baseURL:'https://7ras193lck.execute-api.us-east-1.amazonaws.com/devTest/api',
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label>Message:</label>
          <input
            type="text"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}


