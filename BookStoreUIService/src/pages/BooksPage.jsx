/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import { bookApi } from '../api';
export default function BooksPage() {

    
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [notice, setNotice] = useState(null);

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

}

if(loading) return <p>Loading books...</p>
    
    return (
        <section>
            <h1>Browse Books</h1>
            {error && <div>{error}</div>}
            {notice && <div>{notice}</div>}
            <div className="grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} onAdd={handleAdd} />
                ))}
            </div>
        </section>
    );
}