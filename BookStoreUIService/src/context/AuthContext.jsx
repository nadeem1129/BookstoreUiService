/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => ({
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
    }));

    useEffect(() => {
        if (auth.token) {
            localStorage.setItem('token', auth.token);
            localStorage.setItem('username', auth.username ?? '');
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }, [auth]);

    const value = useMemo(
        () => ({
            ...auth,
            isAuthenticated: Boolean(auth.token),
            async login(credentials) {
                const { data } = await apiClient.post('/auth/login', credentials);
                setAuth({ token: data.token, username: data.username });
            },
            async register(payload) {
                const { data } = await apiClient.post('/auth/register', payload);
                setAuth({ token: data.token, username: data.username });
            },
            logout() {
                setAuth({ token: null, username: null });
            },
        }),
        [auth],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
