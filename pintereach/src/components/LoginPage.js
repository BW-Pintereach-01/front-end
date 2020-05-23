import React from "react";

function LoginPage() {
  return (
    <div>
      <div className="container">
      <form id="form" className="form">
        <h2>Login</h2>
        <div className="form-control">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default LoginPage;