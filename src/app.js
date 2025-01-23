const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const admin = require("firebase-admin");
require("dotenv").config();

//Initializing Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
});

const database = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");

//Use Routes
app.use('/api/user', userRoutes);
app.use('/api/location', locationRoutes);

//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});