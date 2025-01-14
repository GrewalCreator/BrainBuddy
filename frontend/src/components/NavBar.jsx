import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user authentication status when the component mounts
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/is_authenticated', {
          method: 'GET',
          credentials: 'include', // Include cookies for session validation
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isAuthenticated); // Assume server responds with isAuthenticated flag
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Optional: show feedback to the user
        navigate('/login'); // Redirect to the login page after logout
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
        alert('Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during logout.');
    }
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => handleNavigate('/home')}>
        BrainBuddy
      </div>
      <div className="links-container">
        <div className="link" onClick={() => handleNavigate('/home')}>Home</div>
        <div className="link" onClick={() => handleNavigate('/decks')}>My Flashcards</div>
        <div className="link" onClick={() => handleNavigate('/generate')}>Generate Flashcards</div>
        <div className="link" onClick={() => handleNavigate('/contact')}>Contact Devs</div>
        {isLoggedIn && (
          <div className="link" onClick={handleLogout}>Logout</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;