import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { handleLogin } from "../utils/authUtils";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    setMessage(result.message);
    if (result.success) {
      setIsLoggedIn(true);
      navigate("/home");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="page-title">Welcome Back!</h1>
        <p className="page-subtitle">Please log in to continue.</p>
        <form onSubmit={login} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="button full-width">
            Login
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="redirect-message">
          Don't have an account?{" "}
          <Link to="/sign-up" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
