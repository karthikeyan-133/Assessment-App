import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gradient-to-r from-teal-500 to-teal-700 shadow-lg">
            <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center flex-wrap">
                <h1 className="text-3xl font-bold text-white font-poppins">Assessment Application</h1>
                
                <div className="flex items-center md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>

                <ul className={`flex-col md:flex md:flex-row md:items-center md:gap-8 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                    <li>
                        <Link to="/" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/topics" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Take Quiz</Link>
                            </li>
                            <li>
                                <Link to="/StudyPage" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Study Page</Link>
                            </li>
                            <li>
                                <Link to="/JobApply" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Job Apply</Link>
                            </li>
                            <li>
                                <Link to="/OfferLetter" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Offer Letter</Link>
                            </li>
                            <li>
                                <Link to="/InterviewCallLetter" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Interview Call Letter</Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-teal-600 font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-200 font-poppins"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-white hover:text-teal-200 transition duration-300 font-medium font-poppins">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <hr className="border-gray-300 mx-8" />
        </header>
    );
}

export default Header;
