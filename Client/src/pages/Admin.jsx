import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api'; // Ensure this path is correct

const AdminPage = () => {
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState('');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');

    // State for adding questions
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Four options
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [topic, setTopic] = useState('');

    const grantSecondAttempt = async (username) => {
        try {
            await api.post(`${import.meta.env.VITE_API_URL}/admin/grant-second-attempt`, { username });
            localStorage.setItem('hasSecondAttemptPermission', 'true');
            setMessage('Second attempt permission granted successfully.');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to grant permission. Please try again.');
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        try {
            const newQuestion = {
                text: question,
                options: options,
                correctAnswer: correctAnswer,
                topic: topic,
            };
            await api.post(`${import.meta.env.VITE_API_URL}/admin/add-question`, newQuestion);
            setMessage('Question added successfully!');
            // Reset form
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setTopic('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to add question. Please try again.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const leaderboardResponse = await api.get(`${import.meta.env.VITE_API_URL}/leaderboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (leaderboardResponse.data.success) {
                    setLeaderboardData(leaderboardResponse.data.data);
                } else {
                    console.error('Failed to load leaderboard');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-800'} p-6`}>
            <h1 className={`text-5xl font-bold text-center ${isDarkMode ? 'text-teal-400' : 'text-orange-300'} mb-8`}>
                Admin Dashboard
            </h1>

            {/* Add Question Form */}
            <form onSubmit={handleSubmitQuestion} className="mt-10">
                <h2 className="text-4xl font-bold mb-6">Add New Question</h2>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter question"
                    className="border p-2 rounded-lg mb-4 w-full"
                    required
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="border p-2 rounded-lg mb-4 w-full"
                        required
                    />
                ))}
                <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="Correct answer"
                    className="border p-2 rounded-lg mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topic"
                    className="border p-2 rounded-lg mb-4 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-teal-500 text-black py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-400"
                >
                    Add Question
                </button>
                {message && <div className="mt-2 text-green-500">{message}</div>}
            </form>

            {/* Leaderboard Section */}
            <div className="mt-10">
                <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-orange-300'}`}>Leaderboard</h2>
                <table className={`min-w-full bg-white ${isDarkMode ? 'text-white bg-gray-900' : 'text-gray-800 bg-white'} table-auto`}>
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="py-2 px-4 border">Username</th>
                            <th className="py-2 px-4 border">Total Score</th>
                            <th className="py-2 px-4 border">Quiz Count</th>
                            <th className="py-2 px-4 border">Percentage</th>
                            <th className="py-2 px-4 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((user, index) => {
                            const { username, totalScore, quizCount } = user;
                            const percentage = quizCount > 0 ? ((totalScore / quizCount) * 100).toFixed(2) : 0;
                            const status = percentage >= 35 ? 'PASS' : 'FAIL';

                            return (
                                <tr
                                    key={`${user._id}-${index}`}
                                    className={`text-center transition-colors duration-300 ${index % 2 === 0 ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50') : (isDarkMode ? 'bg-gray-800' : 'bg-white')} hover:bg-teal-100`}
                                    onClick={() => setSelectedUsername(username)}
                                >
                                    <td className="px-4 py-2 border">{username}</td>
                                    <td className="px-4 py-2 border">{totalScore}</td>
                                    <td className="px-4 py-2 border">{quizCount}</td>
                                    <td className="px-4 py-2 border">{percentage}%</td>
                                    <td className={`px-4 py-2 border font-semibold ${status === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                                        {status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Grant Second Attempt Section */}
            <div className="mt-10">
                <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-orange-300'}`}>Grant Second Attempt</h2>
                <input
                    type="text"
                    value={selectedUsername}
                    readOnly
                    className="border p-2 rounded-lg mb-4"
                />
                <button 
                    onClick={() => grantSecondAttempt(selectedUsername)}
                    className="bg-teal-500 text-black py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-400"
                >
                    Grant Second Attempt
                </button>
                {message && <div className="mt-2 text-green-500">{message}</div>}
            </div>
        </div>
    );
};

export default AdminPage;
