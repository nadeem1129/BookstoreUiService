/* eslint-disable no-unused-vars */
import apiClient from './client';

export const bookApi = {
    getAll: () => apiClient.get('/books').then((response) => response.data),
};

export const authApi = {
    login: (credentials) => apiClient.post('/auth/login', credentials).then((response) => response.data),
    register: (payload) => apiClient.post('/auth/register', payload).then((response) => response.data),
};

export const cartApi = {
    get: () => apiClient.get('/cart').then((response) => response.data),

    addItem: (bookId, quantity) =>
        apiClient.post('/cart/items', { bookId, quantity }).then((response) => response.data),

    updateItem: (bookId, quantity) =>
        apiClient.put(`/cart/items/${bookId}`, { quantity }).then((response) => response.data),

    removeItem: (bookId) => apiClient.delete(`/cart/items/${bookId}`).then((response) => response.data),
};


export const orderApi = {
    checkout: (idempotencyKey) =>
    apiClient
    .post('/orders/checkout', null, { headers: { 'Idempotency-Key': idempotencyKey } })
    .then((response) => response.data),
};