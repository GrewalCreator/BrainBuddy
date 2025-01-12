import React, { useState } from "react";
import axios from "axios";

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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
                />
                <button type="submit" style={{ padding: "10px", fontSize: "16px", backgroundColor: "#4caf50", color: "white", border: "none", cursor: "pointer" }}>
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;