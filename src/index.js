import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainApi from './utils/MainApi';
import AuthApi from './utils/AuthApi';

const token = localStorage.getItem('token');
MainApi.setupAuthorization(token);
AuthApi.setupAuthorization(token);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();