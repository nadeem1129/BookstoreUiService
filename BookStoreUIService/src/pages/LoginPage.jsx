import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


export default function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
        const [submitting, setSubmitting] = useState(false);

        const { login } = useAuth();
        const { refresh } = useCart();
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state?.from?.pathname ?? '/';

        const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setSubmitting(true);
            try {
                await login(form);
                await refresh();
                navigate(from, { replace: true });
            } catch (err) {
                setError(err.message);
            } finally {
                setSubmitting(false);
            }
        };

    return (
        <section className="auth">
            <h1>Login</h1>
            {error && <div className="alert alert--error">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Username
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button
                    className="btn btn--primary"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? 'Signing in...' : 'Login'}
                </button>
            </form>
            <p>
                No account? <Link to="/register">Register here</Link>
            </p>
        </section>
    );
}