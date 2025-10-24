import axios from 'axios';

const api = axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * Set or remove Authorization header on the axios instance
 * @param {string|null} token
 */
export function setAuthToken(token) {
	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
}

/**
 * Helper to load token from localStorage and apply it to the instance.
 */
export function initAuthFromStorage() {
	try {
		const token = localStorage.getItem('authToken');
		if (token) setAuthToken(token);
	} catch (e) {
		// ignore (e.g., localStorage not available)
	}
}

// initialize on import
initAuthFromStorage();

export default api;
