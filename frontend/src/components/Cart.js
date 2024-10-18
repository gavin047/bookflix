import React, { useContext } from 'react';
import { CartContext } from '../CartContext'; // Import CartContext
import './Cart.css'; // Import CSS
const Cart = () => {
    const { cart } = useContext(CartContext); // Get cart data from context

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((book, index) => (
                        <li key={index}>
                            {book.title} by {book.author} - ${book.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;