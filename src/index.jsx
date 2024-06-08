import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Redirect, Navigate, Routes } from 'react-router-dom';
import './index.scss';
import App from './App';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/Practice_Chinese">

  <React.StrictMode>

    <App />
    <ToastContainer />
  </React.StrictMode>

  </Router>
);
