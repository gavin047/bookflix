import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <header className="navbar">
                <div className="logo">
                    <Link to="/">Bookflix</Link>
                </div>
                <nav className="nav-links">
                    <Link to="/books" className="nav-link">Browse Books</Link>
                    <Link to="/signin" className="nav-link">Sign In</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    <Link to="/cart" className="nav-link cart-button">🛒 Cart</Link>
                </nav>
            </header>
            <main className="main-content">
                <h1>Welcome to Bookflix</h1>
                <p>Your favorite books, just a click away.</p>
            </main>
        </div>
    );
};

export default Home;