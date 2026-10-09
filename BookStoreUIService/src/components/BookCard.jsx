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
        <article className="card">
            <h3 className="card__title">{book.title}</h3>
            <p className="card__author">by {book.author}</p>
            <p className="card__description">{book.description}</p>
            <div className="card__info">
                <span className="card__price">{formatCurrency(book.price)}</span>
                <span className={`card__stock${outOfStock ? ' card__stock--out' : ''}`}>
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
