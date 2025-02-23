import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

function Results() {
    const { isDarkMode } = useTheme();
    const location = useLocation();
    console.log('Results State:', location.state);
    
    const { score, totalQuestions, attemptCount = 1 } = location.state || {};
    const { user } = useAuth();

    if (!score || !totalQuestions) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className={`text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-8 rounded-lg shadow-lg`}>
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p className="mb-4">No results data available. Please take a quiz first.</p>
                    <Link
                        to="/topics"
                        className="inline-block bg-teal-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-500"
                    >
                        Take a Quiz
                    </Link>
                </div>
            </div>
        );
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    const hasFailed = percentage < 35;

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className={`max-w-lg w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-8 rounded-lg shadow-lg text-center`}>
                <h2 className="text-2xl font-bold mb-4">Assesment Results</h2>
                <p className="mb-4">Your Score: <span className="font-semibold">{score}</span> out of {totalQuestions}</p>
                <p className="mb-4">Percentage: <span className="font-semibold">{percentage}%</span></p>
                
                <p className={`text-lg font-bold mb-4 ${percentage >= 35 ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {percentage >= 35 ? 'PASS' : 'FAIL'}
                </p>

                <div className="result-message mb-6">
                    {percentage >= 80 ? (
                        <p className="text-teal-600 font-medium">Excellent job! You've mastered this topic!</p>
                    ) : percentage >= 60 ? (
                        <p className="text-yellow-500 font-medium">Good work! You're on the right track, but there's room for improvement.</p>
                    ) : (
                        <p className="text-red-500 font-medium">Keep practicing! You'll get better with more study.</p>
                    )}
                </div>

                <div className="next-actions space-x-4">
                    {attemptCount < 2 ? (
                        <Link
                            to="/quiz"
                            state={{ 
                                attemptCount: parseInt(attemptCount) + 1,
                                fromResults: true 
                            }}
                            className="inline-block bg-teal-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-500"
                        >
                            Take Another Quiz ({attemptCount}/2 Attempts)
                        </Link>
                    ) : (
                        <p className="text-red-500 mb-4">Maximum attempts reached (2/2)</p>
                    )}
                    <Link
                        to="/leaderboard"
                        state={{ 
                            score, 
                            totalQuestions, 
                            percentage,
                            status: percentage >= 35 ? 'PASS' : 'FAIL'
                        }}
                        className={`inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-300`}
                    >
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Results;