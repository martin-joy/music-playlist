const SongToPlaylist = require("../models/SongToPlaylist");

//adding a songs to playlist by checking wheather it is aldready existing
 
exports.CreateSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.query;
    
    const existingEntry = await SongToPlaylist.findOne({
      where: { playlistId, songId }, 
    });

    if (existingEntry) {
      return res.status(400).json({ error: "Song already exists in the playlist" });
    }
    const playlist = await SongToPlaylist.create({ playlistId, songId });
    res.json(playlist);
  } catch (error) {
    console.error("Error while creating playlist:", error);
    res.status(500).json({ error: "Unable to create playlist" });
  }
};

//find the playlist if it is existing then update by remove the songs from playlist

  exports.updateSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.query;
    console.log("playlistId:", playlistId);
    console.log("songId:", songId);

    const playlist = await SongToPlaylist.findOne({ where: { playlistId } });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const songToDelete = await SongToPlaylist.findOne({
      where: { playlistId,songId },
    });

    if (!songToDelete) {
      return res.status(404).json({ error: "Song not found in the playlist" });
    }

    await songToDelete.destroy();
    res.json(playlist);
  } catch (error) {
    console.error("Error while updating playlist:", error);
    res.status(500).json({ error: "Unable to update playlist" });
  }
};

