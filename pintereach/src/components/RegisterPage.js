import React from 'react';

function RegisterPage() {
  return (
    <div className="container">
      <form id="form" className="form">
        <h2>Register With Us</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default RegisterPage