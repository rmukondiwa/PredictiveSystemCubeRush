const express = require('express');
const { updateLocation, getRecommendation } = require('../controllers/locationController');
const router = express.Router();

router.post("/update", updateLocation);
router.get("/recommendation", getRecommendation);

module.exports = router;