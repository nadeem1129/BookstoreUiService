/* eslint-disable no-unused-vars */
import apiClient from './client';

export const bookApi = {
    getAll : () => apiClient.get('/books').then((response) => response.data),
};

export const authApi = {
    login: (credentials) => apiClient.post('/auth/login', credentials).then((r) => r.data),
    register: (payload) => apiClient.post('/auth/register', payload).then((r) => r.data),
};

export const cartApi = {

}

export const orderApi = {
    
}
