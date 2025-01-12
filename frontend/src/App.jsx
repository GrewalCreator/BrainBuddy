import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Decks from "./pages/Decks";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    return (
        <Router>
            {/* Conditionally render the navbar */}
            {isLoggedIn && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/decks" element={<Decks />} />
            </Routes>
        </Router>
    );
};

export default App;