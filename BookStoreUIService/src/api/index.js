/* eslint-disable no-unused-vars */
import apiClient from './client';

export const bookApi = {
    getAll : () => apiClient.get('/books').then((response) => response.data),
};
