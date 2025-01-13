import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Decks from "./pages/myDecks";
import Team from "./pages/Team";
import Launchpad from "./pages/LaunchPad";
import Test from "./pages/Test";
import Generate from "./pages/Generate";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check if the user is authenticated
    const checkAuthStatus = async () => {
        try {
            const response = await fetch("/api/is_authenticated", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(data.isAuthenticated);
                localStorage.setItem("isLoggedIn", data.isAuthenticated);
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
            }
        } catch (error) {
            console.error("Error checking authentication status:", error);
            setIsLoggedIn(false);
            localStorage.removeItem("isLoggedIn");
        }
    };

    // Check authentication status on app load
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        if (storedIsLoggedIn === "true") {
            setIsLoggedIn(true);
        } else {
            checkAuthStatus();
        }
    }, []);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem("isLoggedIn", status);
    };

    return (
        <Router>
            {isLoggedIn}
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage handleLogin={handleLogin} />}
                />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/contact" element={<Team />} />
                <Route path="/" element={<Launchpad />} />
                <Route path="/testAI" element={<Test />} />

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
                <Route
                    path="/study"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Decks />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/generate"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Generate />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
