const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth.middleware");
const { CreateSongToPlaylist, updateSongToPlaylist } = require("../services/songToPlaylist.services");


router.post("/songToplaylist",validateToken,CreateSongToPlaylist); 
router.put("/songToplaylist",validateToken,updateSongToPlaylist); 

module.exports = router;
