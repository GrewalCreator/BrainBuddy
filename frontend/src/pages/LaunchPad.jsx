import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Launchpad.css";

const Launchpad = () => {
  const navigate = useNavigate();

  return (
    <div className="launchpad-container">
      <header className="launchpad-header">
        <h1 className="launchpad-title">Welcome to BrainBuddy</h1>
        <p className="launchpad-subtitle">Your ultimate companion for learning and growth.</p>
      </header>

      <div className="launchpad-actions">
        <button onClick={() => navigate("/login")} className="button">
          Login
        </button>
        <button onClick={() => navigate("/sign-up")} className="button">
          Sign Up
        </button>
        <button onClick={() => navigate("/contact")} className="button">
          Contact Devs
        </button>
      </div>

      <section className="launchpad-info">
        <h2 className="launchpad-section-title">About BrainBuddy</h2>
        <p className="launchpad-description">
          BrainBuddy is your one-stop platform for mastering subjects like History, Geography,
          Math, English, and Science. With interactive lessons, AI-powered assistance, and
          community-driven support, we're here to help you achieve your learning goals.
        </p>
        <p className="launchpad-description">
          Whether you're preparing for exams, exploring new topics, or just curious to expand your
          knowledge, BrainBuddy is designed to make learning simple, engaging, and effective.
        </p>
      </section>

      <footer className="launchpad-footer">
        <p className="launchpad-footer-text">
          &copy; {new Date().getFullYear()} BrainBuddy. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Launchpad;
