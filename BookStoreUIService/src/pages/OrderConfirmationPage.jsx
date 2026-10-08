import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

export default function OrderConfirmationPage() {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    return (
        <section>
            <div className="alert alert--success">
                <h1>Thank you! Your order is confirmed.</h1>
                <p>
                    Order #{order.id} - status <strong>{order.status}</strong>
                </p>
            </div>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Unit price</th>
                        <th>Quantity</th>
                        <th>Line total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.bookId}>
                            <td>{item.title}</td>
                            <td>{formatCurrency(item.unitPrice)}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.lineTotal)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-summary">
                <span>Total paid</span>
                <strong>{formatCurrency(order.totalAmount)}</strong>
            </div>

            <Link className="btn btn--primary" to="/">
                Continue shopping
            </Link>
        </section>
    );
}
