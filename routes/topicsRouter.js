const express = require('express');
const router = express.Router();
const { getTopics, selectTopics } = require('../controllers/topicController');



// GET /api/topics
router.get('/', getTopics);

// POST /api/topics/select
router.post('/select', selectTopics);

module.exports = router;