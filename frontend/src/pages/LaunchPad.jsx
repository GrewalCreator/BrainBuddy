import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Launchpad.css";

const Launchpad = () => {
  const navigate = useNavigate();

  return (
    <div className="launchpad-container">
      <header className="launchpad-header">
        <h1>Welcome to BrainBuddy</h1>
        <p>Your ultimate companion for learning and growth.</p>
      </header>

      <div className="launchpad-buttons">
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Login
        </button>
        <button onClick={() => navigate("/sign-up")} className="btn btn-secondary">
          Sign Up
        </button>
        <button onClick={() => navigate("/contact")} className="btn btn-outline">
          Contact Devs
        </button>
      </div>

      <section className="launchpad-info">
        <h2>About BrainBuddy</h2>
        <p>
          BrainBuddy is your one-stop platform for mastering subjects like History, Geography,
          Math, English, and Science. With interactive lessons, AI-powered assistance, and
          community-driven support, we're here to help you achieve your learning goals.
        </p>
        <p>
          Whether you're preparing for exams, exploring new topics, or just curious to expand your
          knowledge, BrainBuddy is designed to make learning simple, engaging, and effective.
        </p>
      </section>

      <footer className="launchpad-footer">
        <p>&copy; {new Date().getFullYear()} BrainBuddy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Launchpad;
