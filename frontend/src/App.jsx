import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { checkAuthStatus } from "./utils/authUtils"; // Import the utility function
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

const AuthHandler = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const isAuthenticated = await checkAuthStatus();
            setIsLoggedIn(isAuthenticated);

            if (isAuthenticated) {
                navigate("/home");
            }
        };

        fetchAuthStatus();
    }, []);

    return null;
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
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