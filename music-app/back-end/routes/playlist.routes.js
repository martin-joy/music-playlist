const express = require("express");
const router = express.Router();

const { 
    createPlaylists,
    getPlaylists,
    updatePlaylist,
} = require("../services/playlists.services");
const {validateToken}=require("../middleware/auth.middleware")
//const { validateToken } = require("../middleware/auth.middleware");

router.post("/playlist",validateToken,createPlaylists);
router.get("/playlist",getPlaylists);
router.put("/playlist",validateToken,updatePlaylist)

module.exports = router;
