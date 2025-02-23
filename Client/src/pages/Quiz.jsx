import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

function Quiz() {
    const { isDarkMode } = useTheme();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { attemptCount = 1 } = location.state || {};
    const [score, setScore] = useState(0);
    const totalQuestions = 10; // Example total questions

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const selectedTopics = JSON.parse(localStorage.getItem('selectedTopics'));
                const topicsResponse = await api.get('/topics');
                const availableTopics = topicsResponse.data;

                if (!selectedTopics || selectedTopics.length === 0) {
                    throw new Error('No topics selected');
                }

                const response = await api.get('/quiz/questions', {
                    params: { topics: selectedTopics.join(','), limit: 10 }
                });

                if (!response.data || response.data.length === 0) {
                    throw new Error('No questions available for selected topics');
                }

                setQuestions(response.data);
            } catch (err) {
                let errorMessage = 'Unable to load questions. Please try again.';
                if (err.message === 'No topics selected') {
                    errorMessage = 'Please select topics before starting the quiz.';
                }
                setError(errorMessage);
                setTimeout(() => {
                    navigate('/topics');
                }, 3000);
            }
        };

        fetchQuestions();
    }, [navigate]);

    const handleAnswer = async (answer) => {
        await new Promise(resolve => {
            setAnswers(prevAnswers => {
                const newAnswers = [...prevAnswers];
                newAnswers[currentQuestion] = {
                    questionId: questions[currentQuestion]._id,
                    selectedAnswer: answer
                };
                resolve(newAnswers);
                return newAnswers;
            });
        });

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User not authenticated. Please login again.');
                navigate('/login');
                return;
            }

            const hasAllAnswers = answers.every(answer => 
                answer && answer.selectedAnswer !== undefined
            );

            if (!hasAllAnswers) {
                setError('Please answer all questions before submitting.');
                return;
            }

            const response = await api.post('/quiz/submit', { userId, answers });
            setScore(response.data.score);
            navigate('/results', { 
                state: { 
                    score: response.data.score, 
                    totalQuestions: response.data.totalQuestions,
                    attemptCount: attemptCount
                } 
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit quiz. Please try again.');
        }
    };

    if (error) return <div className={`text-red-500 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>{error}</div>;
    if (questions.length === 0) return <div className={`text-gray-700 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>Loading...</div>;

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`max-w-3xl w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
                    Question {currentQuestion + 1} of {questions.length}
                </h2>
                <QuizQuestion
                    question={questions[currentQuestion]}
                    onAnswer={handleAnswer}
                    selectedAnswers={answers
                        .filter(ans => ans !== null)
                        .map(ans => ans?.selectedAnswer)} // Safely access selectedAnswer
                />
                <div className="mt-6">
                    <progress
                        className="w-full h-2 rounded bg-gray-200"
                        value={currentQuestion + 1}
                        max={questions.length}
                    ></progress>
                </div>
            </div>
        </div>
    );
}

export default Quiz;

