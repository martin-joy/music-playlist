const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth.middleware"); 
const { LikedSongs, getLikedSongs } = require("../services/likedSong.services");

router.post("/likedSongs",validateToken,LikedSongs); 
router.get("/likedSongs",validateToken,getLikedSongs); 

module.exports = router;

