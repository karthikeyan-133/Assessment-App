const express = require('express');
const router = express.Router();
const { getLeaderboard, getUserStats } = require('../controllers/leaderboardController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getLeaderboard);
router.get('/user-stats', protect, getUserStats);

module.exports = router;