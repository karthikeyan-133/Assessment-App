// quiz-app-full-stack/Server/controllers/callLetterController.js
const InterviewCallLetter = require('../models/CallLetterModel');

// Function to handle the submission of the interview call letter
const submitCallLetter = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { name, companyName, department, interviewDate } = req.body;
    const callLetterPhoto = req.file ? req.file.path : null; // Check if file exists

    if (!callLetterPhoto) {
        return res.status(400).json({ message: 'File upload failed or no file provided' });
    }

    const newCallLetter = new InterviewCallLetter({
        name,
        companyName,
        department,
        interviewDate,
        callLetterPhoto,
    });

    try {
        await newCallLetter.save();
        res.status(201).json({ message: 'Call letter submitted successfully!' });
    } catch (error) {
        console.error('Error saving call letter:', error);
        res.status(500).json({ message: 'Error saving to database', error });
    }
};

module.exports = {
    submitCallLetter,
};