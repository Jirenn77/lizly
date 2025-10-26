// Authentication utility functions

// Set authentication token
export function setAuthToken(token) {
    if (typeof window !== 'undefined') {
        // Set in localStorage for client-side access
        localStorage.setItem('authToken', token);
        
        // Also set in cookie for server-side access (middleware)
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    }
}

// Get authentication token
export function getAuthToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
}

// Remove authentication token
export function removeAuthToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        
        // Clear cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }
}

// Logout function - clears auth and redirects to login
export function logout() {
    removeAuthToken();
    // Force reload to clear any cached data
    window.location.href = '/login';
}

// Check if user is authenticated
export function isAuthenticated() {
    return getAuthToken() !== null;
}

