import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { CartContext } from '../CartContext';
import { AuthContext } from '../AuthContext';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext); // Get user from context
    const navigate = useNavigate(); // Hook for navigation

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3001/books');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleBuyClick = (book) => {
        if (!user) {
            alert('You must be logged in to purchase books. Redirecting to login...');
            window.location.href = '/signin'; // Redirect to login page
        } else {
            addToCart(book);
        }
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the home page
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error fetching books: {error}</div>;
    }

    return (
        <div className="book-list">
            {/* Add the heading and home button */}
            <div className="booklist-header">
                <h1>Book List</h1>
                <button onClick={handleHomeClick} className="home-button">Home</button>
            </div>

            <div className="book-cards">
                {books.map((book) => (
                    <div className="book-card" key={book.id}>
                        
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Price: ${book.price.toFixed(2)}</p>
                        <p>Rating: {book.starRating} ⭐</p>
                        <button onClick={() => handleBuyClick(book)}>Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
