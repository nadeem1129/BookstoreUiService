import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { isAuthenticated, username, logout } = useAuth();
    const { itemCount, reset } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        reset();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar_brand">
                Bookstore
            </Link>
            <div className="navbar_links">
                <Link to="/">Books</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/cart">
                            Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                        </Link>
                        <span className="navbar_user">Hi, {username}</span>
                        <button
                            className="btn btn--ghost"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
