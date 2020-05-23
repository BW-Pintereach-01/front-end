import React from 'react';

function RegisterPage() {
  return (
    <div className="container">
      <form id="form" className="form">
        <h2>Register With Us</h2>
        <div className="form-control">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
        </div>
        <div className="form-control">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <div className="form-control">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Enter password again"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default RegisterPage