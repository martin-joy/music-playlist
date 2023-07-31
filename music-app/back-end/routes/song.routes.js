const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth.middleware");
const { createSong , getSongs } = require("../services/song.services.js"); 

router.post("/songs",validateToken,createSong); 
router.get("/songs",getSongs); 

module.exports = router;

