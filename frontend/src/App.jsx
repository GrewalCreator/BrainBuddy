import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { startSessionCheck, handleLogout } from "./utils/authUtils";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import Decks from "./pages/myDecks";
import Team from "./pages/Team";
import Launchpad from "./pages/LaunchPad";
import Chat from "./pages/Chat";
import Generate from "./pages/Generate";
import ChatBox from "./components/ChatBox";
import Navbar from "./components/NavBar";
import { ToastProvider } from "@radix-ui/react-toast";

import "./assets/css/App.css";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  useEffect(() => {
    startSessionCheck(setIsLoggedIn);
    return () => localStorage.removeItem("isLoggedIn");
  }, []);

  const logoutUser = async () => {
    const success = await handleLogout();
    if (success) {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <ToastProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/contact" element={<Team />} />
          <Route path="/" element={<Launchpad />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
                <ChatBox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Chat />
                <ChatBox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/decks"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Decks />
                <ChatBox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Decks />
                <ChatBox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/generate"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Generate />
                <ChatBox />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
