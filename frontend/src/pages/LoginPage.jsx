import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                email,
                password,
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
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn">
                    Login
                </button>
            </form>

            <Link to="/sign-up">
                <button className="btn">Register</button>
            </Link>

            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;