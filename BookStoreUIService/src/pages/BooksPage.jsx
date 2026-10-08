/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import { bookApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function BooksPage() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;
        bookApi.getAll()
        .then((data) => active && setBooks(data))
        .catch((e) => active && setError(e.message))
        .finally(() => active && setLoading(false));
        return () => {
        active = false;
        };
    }, []);

    const handleAdd = async (bookId, quantity) => {
        if(!isAuthenticated) {
            navigate('/login');
            return;
        }
        try{
            await addItem(bookId, quantity);
        setNotice('Added to cart.');
        setTimeout(() => setNotice(null), 2000);
        } catch (e) {
            setError(e.message);
        }
    };
    if(loading) return <p>Loading books...</p>
    
    return (
        <section>
            <h1>Browse Books</h1>
            {error && <div className="alert alert--error">{error}</div>}
            {notice && <div className="alert alert--success">{notice}</div>}
            <div className="grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} onAdd={handleAdd} />
                ))}
            </div>
        </section>
    );
}