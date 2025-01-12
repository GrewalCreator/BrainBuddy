import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/sign-up", {
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    Register
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUpPage;