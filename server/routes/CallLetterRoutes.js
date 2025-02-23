// quiz-app-full-stack/Server/routes/CallLetterRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitCallLetter } = require('../controllers/callLetterController');
//const InterviewCallLetter = require('../models/CallLetterModel'); // Import the controller

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage });

// Use the controller for the POST request
router.post('/', upload.single('callLetterPhoto'), submitCallLetter);

module.exports = router;