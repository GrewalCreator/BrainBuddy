import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/signup.css";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/sign-up", {
                email,
                password,
                name,
            });
            setMessage(response.data.message); // Success message
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error); // Error message from backend
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
        </div>
    );
};

export default SignUpPage;
