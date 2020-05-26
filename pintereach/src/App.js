import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Login from "./components/Login";
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route path='/register' component={Register} />
        {/* <Route path='/dashboard' component={Dashboard} /> */}
        <PrivateRoute exact path="/protected" component={Dashboard} />
    </Router>
  );
}

export default App;
