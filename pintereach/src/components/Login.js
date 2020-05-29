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
        console.log(res.data.user_id);
        console.log(credentials.user_id);
        setUserId({...userId, users_id: res.data.user_id})
        localStorage.setItem("token", res.data.token);
        // console.log(res);
        // console.log(credentials);
      })
      
      .catch(err => console.log(err));
  };


    return (
      <div className="container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
        <button type="submit">Login</button>
      </form>
    </div>
    );
}

export default Login;
