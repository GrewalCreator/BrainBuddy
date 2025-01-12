import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => handleNavigate('/home')}>
        BrainBuddy
      </div>
      <div className="links-container">
        <div className="link" onClick={() => handleNavigate('/home')}>Home</div>
        <div className="link" onClick={() => handleNavigate('/contact')}>Contact Devs</div>
      </div>
    </nav>
  );
};

export default Navbar;