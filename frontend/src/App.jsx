import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Decks from "./pages/Decks";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const handleLogin = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem("isLoggedIn", status);
    };

    return (
        <Router>
            {isLoggedIn && <Navbar />}
            <Routes>
                <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <About />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/decks"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Decks />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;