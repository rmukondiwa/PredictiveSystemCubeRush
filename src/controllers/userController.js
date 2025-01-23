const admin = require("firebase-admin");
const database = admin.firestore();

exports.registerUser = async (req, res) => {
    const { userId, preferences } = req.body; // Example: { userId: "user1", preferences: { interests: ["coffee", "reading"] } }
    try {
        await database.collection('users').doc(userId).set({ preferences});
        res.status(200).send({ message: "User registered successfully"});
    }
    catch (error)
    {
        console.error('Error registering user:', error);
        res.status(500).send({ error: "Failed to register user"});
    }
}