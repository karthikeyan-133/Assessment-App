import React from 'react';

const LeaderboardItem = ({ leaderboardData, isDarkMode }) => {
    return (
        <div>
            {leaderboardData.map((item, index) => {
                const { username, totalscore, totalQuestions, percentage, status } = item; // Ensure these fields exist
                return (
                    <div key={index} className={`max-w-lg w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-4 rounded-lg shadow-lg mb-4`}>
                        <h3 className="text-xl font-bold">User ID: {username}</h3>
                        <p>Your Score: <span className="font-semibold">{totalscore}</span> out of {totalQuestions}</p>
                        <p>Percentage: <span className="font-semibold">{percentage}%</span></p>
                        <p className={`text-lg font-bold ${status === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                            Status: {status}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default LeaderboardItem;