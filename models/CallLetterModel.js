   // quiz-app-full-stack/Server/models/InterviewCallLetter.js
   const mongoose = require('mongoose');

   const InterviewCallLetterSchema = new mongoose.Schema({
       name: { type: String, required: true },
       companyName: { type: String, required: true },
       department: { type: String, required: true },
       interviewDate: { type: Date, required: true },
       callLetterPhoto: { type: String, required: true }, // Store the file path
   });

   module.exports = mongoose.model('InterviewCallLetter', InterviewCallLetterSchema);