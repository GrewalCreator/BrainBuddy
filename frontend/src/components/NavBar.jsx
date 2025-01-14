import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../utils/authUtils"; // Import the utility function
import "../assets/css/navBar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const isAuthenticated = await checkAuthStatus();
            setIsLoggedIn(isAuthenticated);
        };

        fetchAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setIsLoggedIn(false);
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="brand" onClick={() => navigate("/home")}>
                BrainBuddy
            </div>
            <div className="links-container">
                <div className="link" onClick={() => navigate("/home")}>Home</div>
                <div className="link" onClick={() => navigate("/decks")}>My Flashcards</div>
                <div className="link" onClick={() => navigate("/generate")}>Generate Flashcards</div>
                <div className="link" onClick={() => navigate("/contact")}>Contact Devs</div>
                {isLoggedIn && (
                    <div className="link" onClick={handleLogout}>Logout</div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;