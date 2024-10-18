import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css'; // Import CSS for styling

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('visa'); // Default to Visa
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your backend API endpoint
            const response = await axios.post('http://localhost:5000/api/payment', {
                method: paymentMethod,
                amount: amount,
            });
            alert(response.data.message); // Show success message
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Choose Payment Method</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="visa"
                            checked={paymentMethod === 'visa'}
                            onChange={() => setPaymentMethod('visa')}
                        />
                        Visa
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === 'mpesa'}
                            onChange={() => setPaymentMethod('mpesa')}
                        />
                        M-Pesa
                    </label>
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default Payment;