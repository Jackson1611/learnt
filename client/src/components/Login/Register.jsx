import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/login");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-frame">
      <div className="login-form-container">
        <h1>Register</h1>
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
          <label>
            Confirm Password:
            <input
              className="login-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="login-button" type="submit">
            Register
          </button>
        </form>
        <br />
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
