const admin = require('firebase-admin');
const db = admin.firestore();
const { calculateMatch } = require('../utils/matchAlgorithm');

exports.updateLocation = async (req, res) => {
    const { userId, location } = req.body; // Example: { userId: "user1", location: "Bella Union" }
    try {
        await db.collection('locations').doc(userId).set({ location, timestamp: new Date() });
        res.status(200).send({ message: 'Location updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update location' });
    }
};

exports.getRecommendation = async (req, res) => {
    const { userId } = req.query; // Example: /api/location/recommendation?userId=user1
    try {
        const user = await db.collection('users').doc(userId).get();
        const allUsers = await db.collection('users').get();

        const recommendations = [];
        allUsers.forEach(doc => {
            if (doc.id !== userId) {
                const matchScore = calculateMatch(user.data().preferences, doc.data().preferences);
                recommendations.push({ userId: doc.id, matchScore });
            }
        });

        recommendations.sort((a, b) => b.matchScore - a.matchScore);
        res.status(200).send(recommendations.slice(0, 5)); // Top 5 matches
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch recommendations' });
    }
};