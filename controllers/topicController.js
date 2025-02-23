// Sample topics (replace with database query in production)
//const topics = ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'MongoDB'];
// Sample topics (replace with database query in production)
const topics = ['Assessment']; // Updated to a single topic
// ... existing code ...
// Get all topics
const getTopics = (req, res) => {
    res.json(topics);
};

// Select topics (in a real app, you'd save these to the user's profile)
const selectTopics = (req, res) => {
    const { topics: selectedTopics } = req.body;

    // Validate selected topics
    const invalidTopics = selectedTopics.filter(topic => !topics.includes(topic));
    if (invalidTopics.length > 0) {
        return res.status(400).json({ message: `Invalid topics: ${invalidTopics.join(', ')}` });
    }

    // Here you would typically save these topics to the user's profile in the database
    // For this example, we'll just send a success response
    res.json({ message: 'Topics selected successfully', selectedTopics });
};

module.exports = {
    getTopics,
    selectTopics
};