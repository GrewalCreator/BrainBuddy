import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus, handleLogout } from "../utils/authUtils"; // Import the utility function
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

    const logout = async (e) => {
        e.preventDefault();
        const result = await handleLogout();
        if (result.success) {
            setIsLoggedIn(false);
            navigate("/login");
        }
    }

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
                    <div className="link" onClick={logout}>Logout</div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;