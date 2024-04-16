const express = require('express');
const router = express.Router();
const { addLive, getPreviousLive, getUpcomingLive } = require("../controllers/live.js");

router.post('/newlive', addLive);
router.get('/previouslive', getPreviousLive);
router.get('/upcominglive', getUpcomingLive);


module.exports = router;