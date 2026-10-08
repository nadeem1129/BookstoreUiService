// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { orderApi } from '../api';
import { useCart } from '../context/CartContext';
import CartPage from './CartPage';

const mocks = vi.hoisted(() => ({
    navigate: vi.fn(),
    useCart: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: () => mocks.navigate,
}));

vi.mock('../context/CartContext', () => ({
    useCart: mocks.useCart,
}));

const cartItem = {
    bookId: 1,
    title: 'Robin Hood',
    author: 'James Baldwin',
    unitPrice: 12.5,
    quantity: 1,
    lineTotal: 12.5,
};

describe('CartPage checkout', () => {
    let cartState;
    let reset;

    beforeEach(() => {
        vi.spyOn(orderApi, 'checkout');
        reset = vi.fn();
        cartState = {
            cart: { items: [cartItem], subtotal: 12.5 },
            refresh: vi.fn(),
            updateItem: vi.fn(),
            removeItem: vi.fn(),
            reset,
        };
        useCart.mockImplementation(() => cartState);
        vi.stubGlobal('crypto', { randomUUID: () => 'checkout-test-key' });
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('does not allow checkout when the cart is empty', () => {
        cartState.cart = { items: [], subtotal: 0 };

        render(<CartPage />);

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Checkout' })).not.toBeInTheDocument();
        expect(orderApi.checkout).not.toHaveBeenCalled();
    });

    it('keeps the cart and displays the error when checkout reports insufficient stock', async () => {
        orderApi.checkout.mockRejectedValue(new Error('Insufficient stock for Robin Hood.'));

        render(<CartPage />);
        fireEvent.click(screen.getByRole('button', { name: 'Checkout' }));

        expect(await screen.findByText('Insufficient stock for Robin Hood.')).toBeInTheDocument();
        expect(orderApi.checkout).toHaveBeenCalledWith('checkout-test-key');
        expect(reset).not.toHaveBeenCalled();
        expect(mocks.navigate).not.toHaveBeenCalled();
        expect(screen.getByText('Robin Hood')).toBeInTheDocument();
    });
});
