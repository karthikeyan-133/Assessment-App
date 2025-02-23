// quiz-app-full-stack/Server/controllers/callLetterController.js

const JobOfferLetter = require('../models/OfferLetterModel');


// Function to handle the submission of the interview call letter
const submitOfferLetter = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { name, companyName, department } = req.body;
    const offerLetterPhoto = req.file ? req.file.path : null; // Check if file exists

    if (!submitOfferLetterLetterPhoto) {
        return res.status(400).json({ message: 'File upload failed or no file provided' });
    }

    const newOfferLetter = new JobOfferLetter({
        name,
        companyName,
        department,
        offerLetterPhoto,
    });

    try {
        await newOfferLetter.save();
        res.status(201).json({ message: 'Offer letter submitted successfully!' });
    } catch (error) {
        console.error('Error saving Offer letter:', error);
        res.status(500).json({ message: 'Error saving to database', error });
    }
};

module.exports = {
    submitOfferLetter,
};