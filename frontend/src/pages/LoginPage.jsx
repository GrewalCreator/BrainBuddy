import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/css/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", {
                email,
                password,
            });
            setMessage(response.data.message); // Success message
            navigate("/dashboard"); // Redirect on success
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error); // Backend error message
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div>
            <Navbar />
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Welcome Back!</h1>
                <p className="login-subtitle">Please log in to continue.</p>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="btn login-btn">
                        Login
                    </button>
                </form>
                <p className="login-message">{message}</p>
                <p className="login-register">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="register-link">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>

        </div>
        
    );
};

export default LoginPage;
