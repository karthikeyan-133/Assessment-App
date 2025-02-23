import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data
    const [isOpen, setIsOpen] = useState(false); // State to manage the menu open/close

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <Link to="/" className="text-white font-bold text-lg">Quiz App</Link>
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
                <div className={`flex-col md:flex md:flex-row md:items-center md:gap-4 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                    {/* Only show admin link if user is admin */}
                    {user && user.isAdmin && (
                        <Link 
                            to="/admin" 
                            className="text-white hover:text-gray-300"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    {/* Other nav items */}
                    <Link to="/topics" className="text-white hover:text-gray-300">Topics</Link>
                    <Link to="/quiz" className="text-white hover:text-gray-300">Quiz</Link>
                    <Link to="/results" className="text-white hover:text-gray-300">Results</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 