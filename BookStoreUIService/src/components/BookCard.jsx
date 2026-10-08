import { useState } from 'react';
import { formatCurrency } from '../utils/format';

export default function BookCard({ book, onAdd, disabled = false }) {
    const [adding, setAdding] = useState(false);
    const outOfStock = book.stock <= 0;

    const handleAdd = async () => {
        setAdding(true);
        try {
            await onAdd(book.id, 1);
        } finally {
            setAdding(false);
        }
    };

    return (
        <article>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>{book.description}</p>
            <div>
                <span>{formatCurrency(book.price)}</span>
                <span className={`card_stock${outOfStock ? ' card_stock--out' : ''}`}>
                    {outOfStock ? 'Out of stock' : `${book.stock} in stock`}
                </span>
            </div>
            <button
                className="btn btn--primary"
                onClick={handleAdd}
                disabled={disabled || outOfStock || adding}
            >
                {adding ? 'Adding...' : 'Add to cart'}
            </button>
        </article>
    );
}
