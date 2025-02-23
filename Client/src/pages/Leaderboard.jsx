// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import LeaderboardItem from '../components/LeaderboardItem';

// function Leaderboard() {
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [userStats, setUserStats] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchLeaderboardData = async () => {
//             try {
//                 const [leaderboardResponse, userStatsResponse] = await Promise.all([
//                     api.get('/leaderboard'),
//                     api.get('/leaderboard/user-stats')
//                 ]);
//                 setLeaderboard(leaderboardResponse.data);
//                 setUserStats(userStatsResponse.data);
//             } catch (err) {
//                 setError('Failed to fetch leaderboard data. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLeaderboardData();
//     }, []);

//     if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
//     if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Leaderboard</h2>

//                 <table className="w-full table-auto border-collapse">
//                     <thead className="bg-teal-600 text-white">
//                         <tr>
//                             <th className="p-3 text-left">Rank</th>
//                             <th className="p-3 text-left">Username</th>
//                             <th className="p-3 text-left">Total Score</th>
//                             <th className="p-3 text-left">Quizzes Taken</th>
//                             <th className="p-3 text-left">Average Score</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-gray-100 text-gray-700">
//                         {leaderboard.map((user, index) => (
//                             <LeaderboardItem
//                                 key={user._id}
//                                 rank={index + 1}
//                                 username={user.username}
//                                 totalScore={user.totalScore}
//                                 quizCount={user.quizCount}
//                                 averageScore={user.averageScore}
//                             />
//                         ))}
//                     </tbody>
//                 </table>

//                 {userStats && (
//                     <div className="bg-gray-50 p-4 mt-6 rounded-lg shadow-inner text-center">
//                         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Stats</h3>
//                         <p className="text-gray-700 mb-2">Total Score: <span className="font-bold">{userStats.totalScore}</span></p>
//                         <p className="text-gray-700 mb-2">Quizzes Taken: <span className="font-bold">{userStats.quizCount}</span></p>
//                         <p className="text-gray-700 mb-2">Average Score: <span className="font-bold">{userStats.averageScore.toFixed(2)}</span></p>
//                         <p className="text-gray-700 mb-2">Highest Score: <span className="font-bold">{userStats.highestScore}</span></p>
//                         <p className="text-gray-700">Lowest Score: <span className="font-bold">{userStats.lowestScore}</span></p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Leaderboard;


import LeaderboardItem from '../components/LeaderboardItem';

const LeaderboardPage = () => {
    return (
        <div>
            <LeaderboardItem />
        </div>
    );
};

export default LeaderboardPage;