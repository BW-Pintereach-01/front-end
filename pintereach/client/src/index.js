import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import './index.css';


ReactDOM.render(
  <Router>
    <Dashboard />
  </Router>,
  document.getElementById('root')
);
