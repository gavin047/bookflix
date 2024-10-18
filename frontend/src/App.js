import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import Payment from './components/Payment'; // Import Payment component
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} /> {/* Home route */}
                            <Route path="/books" element={<BookList />} />
                            <Route path="/add-book" element={<AddBook />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/payment" element={<Payment />} /> {/* Payment route */}
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;