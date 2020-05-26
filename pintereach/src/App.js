import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from './components/LandingPage'
import LoginPage from "./components/LoginPage";
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <PrivateRoute exact path="/protected" component={Dashboard} />
    </Router>
  );
}

export default App;
