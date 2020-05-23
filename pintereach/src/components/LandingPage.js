import React from "react";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="App">
      <h1>Pintereach</h1>
      <div className="wrapper">
      <h3>Pintereach helps you organize your research by enabling you to save and organize articles in to categories to read later.</h3>
      </div>
      <div className="form">
        <Link to='/login'><button>Log In</button></Link>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/dashboard'><button>Dashboard</button></Link>
      </div>
    </div>
  );
}

export default LandingPage;