import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/css/login.css";
import { handleLogin  } from "../utils/authUtils";

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
    }

    return (
        <div>
            <Navbar />
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-title">Welcome Back!</h1>
                    <p className="login-subtitle">Please log in to continue.</p>
                    <form onSubmit={login} className="login-form">
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