const fs = require('fs');
const path = require('path');
const Score = require('../models/scoreModel');

// Function to read questions from JSON file
const readQuestionsFromFile = () => {
    const filePath = path.join(__dirname, '../data/questions.json'); // Adjusted path
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading questions from file:", error);
        return []; // Return an empty array if there's an error
    }
};


const getQuestions = (req, res) => {
    try {
        const { topics } = req.query;
        const topicsArray = topics ? topics.split(',') : [];
        
        // Validate if topics are provided
        if (!topics || topicsArray.length === 0) {
            return res.status(400).json({ message: 'Topics are required' });
        }

        const sampleQuestions = readQuestionsFromFile();
        
        // Check if questions were loaded successfully
        if (!sampleQuestions || sampleQuestions.length === 0) {
            return res.status(500).json({ message: 'Failed to load questions' });
        }

        const filteredQuestions = sampleQuestions
            .filter(q => topicsArray.includes(q.topic))
            .filter(q => {
                // Validate question format
                return (
                    q._id &&
                    q.text &&
                    Array.isArray(q.options) &&
                    q.options.length >= 2 &&  // Ensure at least 2 options
                    q.correctAnswer &&
                    q.topic
                );
            });
            
        // Check if any questions match the requested topics
        if (filteredQuestions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified topics' });
        }

        // Ensure all questions have 4 options
        const normalizedQuestions = filteredQuestions.map(question => {
            const { correctAnswer, ...rest } = question;
            
            // If less than 4 options, pad with placeholder options
            while (rest.options.length < 4) {
                rest.options.push("Not Applicable");
            }
            
            // Ensure only 4 options are sent
            rest.options = rest.options.slice(0, 4);
            
            return rest;
        });

        res.json(normalizedQuestions);
    } catch (error) {
        console.error('Error in getQuestions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const submitQuiz = async (req, res) => {
    try {
        const { userId, answers } = req.body;

        // Validate required fields
        if (!userId || !answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        const sampleQuestions = readQuestionsFromFile();
        
        // Validate answers format and calculate score
        const score = answers.reduce((acc, answer) => {
            const question = sampleQuestions.find(q => q._id === answer.questionId);
            if (!question) return acc; // Skip invalid questions
            return acc + (question.correctAnswer === answer.selectedAnswer ? 1 : 0);
        }, 0);

        const totalQuestions = answers.length;
        const newScore = new Score({
            user: userId,
            score: score,
            totalQuestions: totalQuestions,
            submittedAt: new Date() // Add timestamp
        });

        await newScore.save();
        res.json({ score, totalQuestions });
    } catch (error) {
        console.error('Error in submitQuiz:', error);
        res.status(500).json({ message: 'Server error while saving quiz response' });
    }
};

module.exports = {
    getQuestions,
    submitQuiz
};
