import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Register extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  register = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/register", this.state.credentials)
      // POST request to register endpoint
      // if creds are valid server returns JSON web token
      .then(res => {
        // set token to localStorage (sessions)
        localStorage.setItem("token", res.data.payload);
        // // navigate user to "/protected" route
        this.props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
      <form id="form" className="form" onSubmit={this.register}>
        <h2>Register</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    );
  }
}

export default Register;