// Use the same origin (host:port) so API calls work from any deployment
// e.g., http://localhost:8080 (Docker), http://localhost:8000 (php artisan serve), etc.
const API_URL = `${window.location.origin}/api`;

export const api = {
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

    async logout(token) {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        return response.json();
    },

    async getUser(token) {
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

	async get(endpoint){
		const response = await fetch(`${API_URL}/${endpoint}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Accept': 'application/json',
			}
		});

		if (!response.ok) {
			const error = await response.json();
			throw error;
		}

		return response.json();
	}
};
