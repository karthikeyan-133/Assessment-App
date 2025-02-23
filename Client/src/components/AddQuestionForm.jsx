// quiz-app-full-stack/Client/src/components/AddQuestionForm.jsx
import React, { useState } from 'react';
import api from '../services/api'; // Adjust the import based on your API service

const AddQuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Four options
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newQuestion = {
                text: question,
                options: options,
                correctAnswer: correctAnswer,
                topic: topic,
            };
            await api.post('http://localhost:5000/admin/add-question', newQuestion);
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

    return (
        <form onSubmit={handleSubmit} className="mt-10">
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
    );
};

export default AddQuestionForm;