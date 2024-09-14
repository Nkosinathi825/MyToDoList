import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state to store the logged-in user information

    const login = (userInfo) => {
        // Call this function when the user logs in to store user info
        setUser(userInfo);
    };

    const logout = () => {
        // Clear user info when the user logs out
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
