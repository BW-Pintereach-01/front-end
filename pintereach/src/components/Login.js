import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      user_id: "",
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

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://pintereach-1.herokuapp.com/api/auth/login", this.state.credentials)
      .then(res => {
        this.setState({
          credentials: {
            ...this.state.credentials,
            user_id: res.data.user_id
          }
        })
        console.log(`${JSON.stringify(this.state.credentials)}`)
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
      <form id="form" className="form" onSubmit={this.login}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
    );
  }
}

export default Login;
