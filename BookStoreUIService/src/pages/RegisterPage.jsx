import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await register(form);
            navigate('/', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="auth">
            <h1>Create an account</h1>
            {error && <div className="alert alert--error">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Username
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={form.email}
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
                        minLength={6}
                    />
                </label>
                <button
                    className="btn btn--primary"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Register'}
                </button>
            </form>
            <p>
                Already registered? <Link to="/login">Login</Link>
            </p>
        </section>
    );
}
