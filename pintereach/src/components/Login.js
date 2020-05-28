import React, {useState, useContext} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {ArticleContext} from '../context/ArticleContext'

const initialState = {
  username: '',
  password: '',
  user_id: null,
};

const Login = () => {
  const {userId, setUserId} = useContext(ArticleContext);
  const [credentials, setCredential] = useState(initialState)

  const handleChange = e => {
    setCredential({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://pintereach-1.herokuapp.com/api/auth/login", credentials)
      .then(res => {
        setUserId({...userId, user_id: res.data.user_id})
        console.log(userId)
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      
      .catch(err => console.log(err));
  };


    return (
      <div className="container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        <button type="submit">Login</button>
      </form>
    </div>
    );
}

export default Login;
