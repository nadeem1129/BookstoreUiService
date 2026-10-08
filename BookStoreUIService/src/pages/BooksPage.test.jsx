// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bookApi } from '../api';
import BooksPage from './BooksPage';

const books = [
    {
        id: 1,
        title: 'Robin Hood',
        author: 'James Baldwin',
        description: 'A fantasy adventure.',
        price: 12.5,
        stock: 4,
    },
    {
        id: 2,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A classic novel.',
        price: 9.99,
        stock: 0,
    },
];

describe('BooksPage', () => {
    let getAll;

    beforeEach(() => {
        getAll = vi.spyOn(bookApi, 'getAll');
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('shows a loading message while books are being fetched', async () => {
        let resolveBooks;
        getAll.mockReturnValue(new Promise((resolve) => {
            resolveBooks = resolve;
        }));

        render(<BooksPage />);

        expect(screen.getByText('Loading books...')).toBeInTheDocument();
        expect(getAll).toHaveBeenCalledOnce();

        await act(async () => {
            resolveBooks([]);
        });
    });

    it('renders each book after the API request succeeds', async () => {
        getAll.mockResolvedValue(books);

        render(<BooksPage />);

        expect(await screen.findByRole('heading', { name: 'Browse Books' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Robin Hood' })).toBeInTheDocument();
        expect(screen.getByText('by James Baldwin')).toBeInTheDocument();
        expect(screen.getByText('A fantasy adventure.')).toBeInTheDocument();
        expect(screen.getByText('$12.50')).toBeInTheDocument();
        expect(screen.getByText('4 in stock')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Pride and Prejudice' })).toBeInTheDocument();
        expect(screen.getByText('by Jane Austen')).toBeInTheDocument();
        expect(screen.getByText('A classic novel.')).toBeInTheDocument();
        expect(screen.getByText('$9.99')).toBeInTheDocument();
        expect(screen.getByText('Out of stock')).toBeInTheDocument();
        expect(getAll).toHaveBeenCalledOnce();
    });

    it('displays the API error when fetching books fails', async () => {
        getAll.mockRejectedValue(new Error('Unable to load books.'));

        render(<BooksPage />);

        expect(await screen.findByText('Unable to load books.')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Browse Books' })).toBeInTheDocument();
        expect(screen.queryByText('Loading books...')).not.toBeInTheDocument();
    });

    it('renders the page without book cards when the API returns an empty list', async () => {
        getAll.mockResolvedValue([]);

        render(<BooksPage />);

        expect(await screen.findByRole('heading', { name: 'Browse Books' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Robin Hood' })).not.toBeInTheDocument();
    });
});
