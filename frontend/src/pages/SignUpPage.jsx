import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/signup.css";
import { ToastDemo } from "../components/Toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/sign-up", {
        email,
        password,
        name,
      });
      setMessage(response.data.message);
      setToastTitle("Sign Up Successful");
      setToastDescription("You have successfully signed up.");
      setOpen(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="page-title">Create Your Account</h1>
        <p className="page-subtitle">Join BrainBuddy today!</p>
        <form onSubmit={handleSignUp} className="form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
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
            Register
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="redirect-message">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>

      <ToastDemo
        open={open}
        setOpen={setOpen}
        title={toastTitle}
        description={toastDescription}
      />
    </div>
  );
};

export default SignUpPage;
