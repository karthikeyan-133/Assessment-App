import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // Check if the user is already logged in
        if (AuthService.isAuthenticated()) {
            navigate('/topics', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await AuthService.login(email, password);
            if (res && res.token) {
                navigate('/topics', { replace: true });
            } else {
                setError('Invalid login response');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
            console.error('Login error:', err);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`max-w-md w-full space-y-8 p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg shadow-md`}>
                <div className="text-center">
                    <h2 className="text-3xl font-bold">{isDarkMode ? 'Login' : 'Login'}</h2>
                    <hr className="my-4 border-gray-300" />
                </div>
                {error && (
                    <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;