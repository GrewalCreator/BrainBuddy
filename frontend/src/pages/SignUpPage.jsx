import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/signup.css";
import Navbar from "../components/NavBar";

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
        <div>
            <Navbar />
            <div className="sign-up-page">
            
                <div className="sign-up-container">
                    <h1 className="sign-up-title">Sign Up</h1>
                    <form onSubmit={handleSignUp} className="sign-up-form">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="sign-up-input"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="sign-up-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="sign-up-input"
                        />
                        <button type="submit" className="btn sign-up-btn">
                            Register
                        </button>
                    </form>

                    {message && <p className="sign-up-message">{message}</p>}

                    {/* Added login link */}
                    <div className="login-link-container">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="login-link">Login</Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default SignUpPage;
