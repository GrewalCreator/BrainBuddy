import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
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
    return isLoggedIn ? children : <Navigate to="/login" />;
};

// New Component: Handles Authentication and Navigation
const AuthHandler = ({ setIsLoggedIn }) => {
    const navigate = useNavigate(); // useNavigate is safe here since it's inside Router

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

                // Redirect to /home if authenticated
                if (data.isAuthenticated) {
                    navigate("/home");
                }
            } else {
                setIsLoggedIn(false); // User is not authenticated
            }
        } catch (error) {
            console.error("Error checking authentication status:", error);
            setIsLoggedIn(false); // Handle authentication error
        }
    };

    useEffect(() => {
        checkAuthStatus(); // Call checkAuthStatus once when the app loads
    }, []);

    return null; // This component doesn't render anything
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            {/* AuthHandler handles initial authentication check */}
            <AuthHandler setIsLoggedIn={setIsLoggedIn} />

            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage handleLogin={setIsLoggedIn} />}
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