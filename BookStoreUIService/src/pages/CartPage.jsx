import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../api';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

export default function CartPage() {
    const { cart, refresh, updateItem, removeItem, reset } = useCart();
    const [error, setError] = useState(null);
    const [checkingOut, setCheckingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleQuantityChange = async (bookId, quantity) => {
        if (quantity < 1) return;

        try {
            await updateItem(bookId, quantity);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCheckout = async () => {
        if (cart.items.length === 0) {
            return;
        }

        setError(null);
        setCheckingOut(true);

        const idempotencyKey = crypto.randomUUID();
        try {
            const order = await orderApi.checkout(idempotencyKey);
            reset();
            navigate('/order-confirmation', { state: { order } });
        } catch (err) {
            setError(err.message);
        } finally {
            setCheckingOut(false);
        }
    };

    if (cart.items.length === 0) {
        return (
            <section>
                <h1>Your Cart</h1>
                {error && <div className="alert alert--error">{error}</div>}
                <p className="state">Your cart is empty.</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Your Cart</h1>
            {error && <div className="alert alert--error">{error}</div>}
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Line total</th>
                        <th aria-label="Actions" />
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item) => (
                        <tr key={item.bookId}>
                            <td>
                                <strong>{item.title}</strong>
                                <div className="muted">by {item.author}</div>
                            </td>
                            <td>{formatCurrency(item.unitPrice)}</td>
                            <td>
                                <div className="qty">
                                    <button
                                        className="btn btn--plusminus"
                                        onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label={`Decrease quantity of ${item.title}`}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="btn btn--plusminus"
                                        onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                                        aria-label={`Increase quantity of ${item.title}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{formatCurrency(item.lineTotal)}</td>
                            <td>
                                <button
                                    className="btn btn--danger"
                                    onClick={() => removeItem(item.bookId)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-summary">
                <span>Subtotal</span>
                <strong>{formatCurrency(cart.subtotal)}</strong>
            </div>

            <button
                className="btn btn--primary btn--lg"
                onClick={handleCheckout}
                disabled={checkingOut}
            >
                {checkingOut ? 'Processing...' : 'Checkout'}
            </button>
        </section>
    );
}
