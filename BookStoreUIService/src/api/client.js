import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'Something went wrong. Please try again.';
        const errorResponse = error.response;
        const responseData = errorResponse && errorResponse.data;

        if (responseData) {
            if (responseData.fieldErrors && responseData.fieldErrors.length > 0) {
                const messages = [];
                for (const fieldError of responseData.fieldErrors) {
                    messages.push(`${fieldError.field}: ${fieldError.message}`);
                }
                message = messages.join(', ');
            } else if (responseData.message) {
                message = responseData.message;
            }
        }

        if (errorResponse && errorResponse.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }

        return Promise.reject(new Error(message));
    },
);

export default apiClient;
