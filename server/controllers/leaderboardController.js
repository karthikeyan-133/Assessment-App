const Score = require('../models/scoreModel');
const User = require('../models/userModel');

// Get leaderboard - top 10 users based on total score
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.aggregate([
            {
                $lookup: {
                    from: 'scores', // Assuming the collection for scores is named 'scores'
                    localField: '_id',
                    foreignField: 'user',
                    as: 'scoresData'
                }
            },
            {
                $unwind: {
                    path: '$scoresData',
                    preserveNullAndEmptyArrays: true // Include users without scores
                }
            },
            {
                $group: {
                    _id: '$_id', // Group by user ID
                    username: { $first: '$name' }, // Include username
                    totalScore: { $sum: { $ifNull: ['$scoresData.score', 0] } }, // Sum scores or 0 if no scores
                    quizCount: { $sum: { $cond: [{ $ifNull: ['$scoresData.score', false] }, 1, 0] } }, // Count quizzes taken
                    averageScore: { $avg: { $ifNull: ['$scoresData.score', 0] } } // Average score
                }
            },
            {
                $sort: { totalScore: -1 } // Sort by total score
            },
            {
                $limit: 500 // Limit to top 10 users
            },
            {
                $project: {
                    _id: 0, // Exclude the MongoDB internal _id field
                    username: 1,
                    totalScore: 1,
                    quizCount: 1,
                    averageScore: { $ifNull: [{ $round: ['$averageScore', 2] }, 0] } // Round average score
                }
            }
        ]);


        res.status(200).json({
            success: true,
            data: leaderboard
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching leaderboard' });
    }
};

// Get stats for a single user (personal stats)
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is attached to req via auth middleware

        const userStats = await Score.aggregate([
            {
                $match: { user: userId } // Match scores for the specific user
            },
            {
                $group: {
                    _id: '$user', // Group by user ID
                    totalScore: { $sum: '$score' }, // Total score
                    quizCount: { $sum: 1 }, // Number of quizzes taken
                    averageScore: { $avg: '$score' }, // Average score
                    highestScore: { $max: '$score' }, // Highest score
                    lowestScore: { $min: '$score' } // Lowest score
                }
            }
        ]);

        // If no stats are found, return a 404
        if (userStats.length === 0) {
            return res.status(404).json({ success: false, message: 'No stats found for this user' });
        }

        res.status(200).json({
            success: true,
            data: userStats[0]
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching user stats' });
    }
};
