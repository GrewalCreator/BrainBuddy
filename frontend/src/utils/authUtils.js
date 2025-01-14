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
