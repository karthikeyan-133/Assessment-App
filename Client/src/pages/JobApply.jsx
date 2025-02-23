// quiz-app-full-stack/Client/src/pages/JobApply.jsx
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const JobApply = () => {
    const { isDarkMode } = useTheme();
    const [applications, setApplications] = useState([
        {
            id: 1,
            companyName: 'Company A',
            jobName: 'Software Engineer',
            description: 'Join our team to develop cutting-edge software',
            photo: 'path/to/companyA.jpg', // Replace with actual image path
        },
        {
            id: 2,
            companyName: 'Company B',
            jobName: 'Product Manager',
            description: 'Lead product development and strategy.',
            photo: 'path/to/companyB.jpg', // Replace with actual image path
        },
        // Add more companies as needed
    ]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} p-6`}>
            <h1 className="text-4xl font-bold text-center mb-6">Job Applications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((job) => (
                    <div key={job.id} className={`rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <img src={job.photo} alt={job.companyName} className="w-full h-32 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1">{job.jobName}</h2>
                            <p className="text-gray-600 mb-1">{job.companyName}</p>
                            <p className="text-gray-500 mb-4">{job.description}</p>
                            <button
                                className={`w-full py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-teal-500 text-white hover:bg-teal-600'} transition duration-300`}
                                onClick={() => console.log(`Applying to ${job.jobName}`)} // Replace with actual navigation logic
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobApply;