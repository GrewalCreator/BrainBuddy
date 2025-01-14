export const checkAuthStatus = async () => {
    try {
        const response = await fetch("/api/is_authenticated", {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            return data.isAuthenticated; // Return the authentication status
        } else {
            return false; // User is not authenticated
        }
    } catch (error) {
        console.error("Error checking authentication status:", error);
        return false; // Handle error gracefully
    }
};

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
            return { success: true, message: "Login successful!" }; // Success response
        } else {
            return { success: false, message: "Username/password incorrect." }; // Failure response
        }
    } catch (error) {
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        }; // Handle error
    }
};

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
            return true; // Indicate successful logout
        } else {
            return false; // Indicate failure
        }
    } catch (error) {
        return false; // Handle error case
    }
};
