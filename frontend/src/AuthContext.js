import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state

    const login = (username, password) => {
        // Implement your login logic here
        // For demonstration, we'll just set a dummy user
        if (username && password) {
            setUser({ username });
            alert('Login successful!');
        } else {
            alert('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        alert('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};