import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Test for .env loading
const BASE_URL = process.env.REACT_APP_BASE_URL;
const OPENWEATHER_API = process.env.REACT_APP_OPENWEATHER_API

ReactDOM.render(
  <React.StrictMode>
    <App weatherapi={OPENWEATHER_API}/>
  </React.StrictMode>,
  document.getElementById('root'),

);


