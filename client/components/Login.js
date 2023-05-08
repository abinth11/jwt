import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const LoginFrom = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);    
  };

  const handlePasswordChange = (event) => {     
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username,
      password
    }
    fetch('http://localhost:3000/user-login', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(async response => {
      const parsedResponse = await response.json()
      const {data} = parsedResponse
      if(!data?.status){
          alert(data?.Message)
      }else {
        alert('successfully logged in')
        localStorage.setItem('token', data?.token);
      }
      console.log(parsedResponse)
  }).catch(err => {
      console.log(err)
  })
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginFrom;
