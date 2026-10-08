/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cartApi } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState({ items: [], subtotal: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        if (!isAuthenticated) {
            setCart({ items: [], subtotal: 0 });
            return;
        }

        setLoading(true);
        setError(null);
        try {
            setCart(await cartApi.get());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const runAndStore = useCallback(async (operation) => {
        setError(null);
        try {
            setCart(await operation());
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    const value = useMemo(
        () => ({
            cart,
            loading,
            error,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            refresh,
            addItem: (bookId, quantity) => runAndStore(() => cartApi.addItem(bookId, quantity)),
            updateItem: (bookId, quantity) => runAndStore(() => cartApi.updateItem(bookId, quantity)),
            removeItem: (bookId) => runAndStore(() => cartApi.removeItem(bookId)),
            reset: () => setCart({ items: [], subtotal: 0 }),
        }),
        [cart, loading, error, refresh, runAndStore],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
