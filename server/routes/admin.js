const express = require('express');
const router = express.Router();
const Score = require('../models/scoreModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const fs = require('fs');
const path = require('path');

// Get leaderboard data (admin only)
router.get('/results', [auth, admin], async (req, res) => {
    try {
        const leaderboard = await Score.find()
            .populate('user', 'email registerId department')
            .sort({ score: -1 })
            .lean()  // Convert to plain JavaScript object
            .exec();

        // Ensure we're sending an array
        res.json(Array.isArray(leaderboard) ? leaderboard : []);
    } catch (err) {
        console.error('Leaderboard error:', err);
        res.status(500).json({ error: 'Server Error', details: err.message });
    }
});

// Get quiz results (admin only)
router.post('/results', [auth, admin], async (req, res) => {
    const { userId, score, totalQuestions, percentage, status } = req.body;

    try {
        const newScore = new Score({
            user: userId,
            score,
            totalQuestions,
            percentage,
            status
        });

        await newScore.save();

        res.status(201).json({ message: 'Results saved successfully', score: newScore });
    } catch (err) {
        console.error('Error saving results:', err);
        res.status(500).json({ error: 'Server Error', details: err.message });
    }
});

// Grant second attempt permission (admin only)
router.post('/grant-second-attempt', [auth, admin], (req, res) => {
    const { userId } = req.body;

    // Logic to grant second attempt permission
    console.log(`Granting second attempt to user: ${userId}`);

    // Simulate granting permission (you would typically update a database here)
    return res.status(200).json({ message: 'Second attempt permission granted.' });
});

// Endpoint to add a new question
router.post('/add-question', (req, res) => {
    const newQuestion = req.body;

    // Read existing questions
    const questionsPath = path.join(__dirname, '../data/questions.json');
    fs.readFile(questionsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading questions file' });
        }

        const questions = JSON.parse(data);
        questions.push({ ...newQuestion, _id: (questions.length + 1).toString() }); // Assign a new ID

        // Write updated questions back to the file
        fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving question' });
            }
            res.status(201).json({ message: 'Question added successfully' });
        });
    });
});

module.exports = router; 