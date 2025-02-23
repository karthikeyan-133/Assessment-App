import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

function TopicSelection() {
    const { isDarkMode } = useTheme();
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await api.get('/topics');
                setTopics(response.data);
            } catch (err) {
                setError('Failed to fetch topics. Please try again.');
                console.error('Error fetching topics:', err);
            }
        };

        fetchTopics();
    }, []);

    const handleTopicChange = (topic) => {
        setSelectedTopics((prevTopics) =>
            prevTopics.includes(topic)
                ? prevTopics.filter((t) => t !== topic)
                : [...prevTopics, topic]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTopics.length === 0) {
            setError('Please select at least one topic');
            return;
        }
        try {
            await api.post('/topics/select', { topics: selectedTopics });
            localStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
            navigate('/quiz');
        } catch (err) {
            setError('Failed to save selected topics. Please try again.');
            console.error('Error saving topics:', err);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`max-w-lg w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg shadow-md p-8`}>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Select Topics
                </h2>
                <hr className="mb-6 border-gray-300" />
                {error && (
                    <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {topics.map((topic) => (
                            <div
                                key={topic}
                                className={`flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border border-gray-300 rounded-md p-3 hover:bg-teal-100 transition duration-300`}
                            >
                                <input
                                    type="checkbox"
                                    id={topic}
                                    value={topic}
                                    checked={selectedTopics.includes(topic)}
                                    onChange={() => handleTopicChange(topic)}
                                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                />
                                <label
                                    htmlFor={topic}
                                    className={`ml-3 text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    {topic}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
                    >
                        Start Assessment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TopicSelection;