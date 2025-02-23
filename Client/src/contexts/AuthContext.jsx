import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on component mount
        const checkAuth = async () => {
            if (AuthService.isAuthenticated()) {
                const userData = AuthService.getCurrentUser();
                setUser(userData);
            }
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    const value = {
        user,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 