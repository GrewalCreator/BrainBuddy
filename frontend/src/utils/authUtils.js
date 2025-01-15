let sessionInterval = null;

// Check if the user is logged in
export const checkAuthStatus = async () => {
    try {
        const response = await fetch("/api/is_authenticated", {
        method: "GET",
        credentials: "include",
        });

        if (response.ok) {
        const data = await response.json();
        return data.isAuthenticated;
        } else {
        return false;
        }
    } catch (error) {
        console.error("Error checking authentication status:", error);
        return false;
    }
};

// Handle user login
export const handleLogin = async (email, password) => {
    try {
        const response = await fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            localStorage.setItem("isLoggedIn", true);
            return { success: true, message: "Login successful!" };
        } else {
            return { success: false, message: "Invalid credentials." };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        };
    }
};

// Handle user logout
export const handleLogout = async () => {
    try {
        const response = await fetch("/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        });

        if (response.ok) {

        localStorage.removeItem("isLoggedIn");
        clearSessionCheck();
        return true;
        } else {
        return false;
        }
    } catch (error) {
        console.error("Error logging out:", error);
        return false;
    }
};

// Validate session periodically
export const startSessionCheck = (setIsLoggedIn) => {
    const validateSession = async () => {
        const isAuthenticated = await checkAuthStatus();
        if (isAuthenticated) {
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        } else {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        clearSessionCheck();
        }
    };

    // Run validation immediately
    validateSession();

    // Start interval for session validation
    sessionInterval = setInterval(validateSession, 5 * 60 * 1000); // Every 5 minutes
};

// Clear the session validation interval
export const clearSessionCheck = () => {
    if (sessionInterval) {
        clearInterval(sessionInterval);
        sessionInterval = null;
    }
};
