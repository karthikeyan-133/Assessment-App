// quiz-app-full-stack/Client/src/pages/JobApply.jsx
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const InterviewCallLetter = () => {
    const { isDarkMode } = useTheme();
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [interviewDate, setInterviewDate] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !department || !companyName || !interviewDate || !photo) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        console.log('Form submitted:', { name, department, companyName, interviewDate, photo });
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} p-6`}>
            <h1 className="text-4xl font-bold text-center mb-6">Job Application</h1>
            <div className={`max-w-md mx-auto rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Department
                        </label>
                        <input
                            type="text"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <div>
                        <label htmlFor="companyName" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <div>
                        <label htmlFor="interviewDate" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Interview Date
                        </label>
                        <input
                            type="date"
                            id="interviewDate"
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <div>
                        <label htmlFor="photo" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Photo
                        </label>
                        <input
                            type="file"
                            id="photo"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                            className={`mt-1 w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
                    >
                        Apply
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InterviewCallLetter;