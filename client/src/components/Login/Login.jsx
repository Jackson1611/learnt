import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Typography } from "@mui/material";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("username", data.username);
      navigate("/skills");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
