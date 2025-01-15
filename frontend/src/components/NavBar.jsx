
import logo from "../assets/images/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/navBar.css";

const Navbar = ({ isLoggedIn, logoutUser }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="brand-container" onClick={() => navigate("/home")}>
        <img src={logo} alt="BrainBuddy Logo" className="brand-logo" />
        <span className="brand-text">BrainBuddy</span>
      </div>
      <div className="links-container">
        <div className="link" onClick={() => navigate("/home")}>Home</div>
        <div className="link" onClick={() => navigate("/decks")}>My Flashcards</div>
        <div className="link" onClick={() => navigate("/generate")}>Generate Flashcards</div>
        <div className="link" onClick={() => navigate("/contact")}>Contact Devs</div>
        {isLoggedIn ? (
          <div className="link logout" onClick={logoutUser}>Logout</div>
        ) : (
          <div className="link login" onClick={() => navigate("/login")}>Login</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
