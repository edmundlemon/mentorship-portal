// Use environment variable if available, otherwise use same origin
// Environment variable is set in .env file: VITE_API_URL
// Falls back to current origin for backward compatibility
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : `${window.location.origin}/api`;


export const api = {
    
    // --- AUTHENTICATION METHODS ---

    async register(data) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },

    async login(data) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },

    async logout() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        // Logout often returns 204 No Content, so we might not get JSON back
        if (!response.ok) {
             // Handle error purely if status is bad
             console.error("Logout failed");
        }
        
        return true;
    },

    async getUser() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        return response.json();
    },

    // --- DATA METHODS (CRUD) ---

    async get(endpoint) {
        const token = localStorage.getItem('token');
        // Remove leading slash if user provided one to avoid double slashes (optional safeguard)
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

        const response = await fetch(`${API_URL}/${cleanEndpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },

    // THIS WAS THE MISSING METHOD CAUSING YOUR CRASH
    async post(endpoint, data) {
        const token = localStorage.getItem('token');
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

        const response = await fetch(`${API_URL}/${cleanEndpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },

    // Added PUT for editing (Future proofing)
    async put(endpoint, data) {
        const token = localStorage.getItem('token');
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

        const response = await fetch(`${API_URL}/${cleanEndpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },

    // Added DELETE (Future proofing)
    async delete(endpoint) {
        const token = localStorage.getItem('token');
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

        const response = await fetch(`${API_URL}/${cleanEndpoint}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    }
};