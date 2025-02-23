   // quiz-app-full-stack/Server/models/InterviewCallLetter.js
   const mongoose = require('mongoose');

   const JobOfferLetterSchema = new mongoose.Schema({
       name: { type: String, required: true },
       companyName: { type: String, required: true },
       department: { type: String, required: true },
       offerLetterPhoto: { type: String, required: true }, // Store the file path
   });

   module.exports = mongoose.model('JobOfferLetter', JobOfferLetterSchema);