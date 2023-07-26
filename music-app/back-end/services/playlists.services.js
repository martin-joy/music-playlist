const { Op } = require("sequelize");
const Playlist = require("../models/Playlist");
const Songs = require("../models/Songs");
const SongToPlaylist = require("../models/SongToPlaylist");
const LikedSongs = require("../models/LikedSong");

//create playlist by userId and playlist name 

exports.createPlaylists = async (req, res) => {
  console.log("playlists create hit");

  const { userId, playlistName } = req.query;

  if (!userId?.trim() || !playlistName?.trim()) {
    return res.status(400).json({ error: "Enter input correctly" });
  }
  try {
    const existingPlaylist = await Playlist.findOne({
      where: { playlistName },
    });
    if (existingPlaylist) {
      return res.status(500).send({
        message:
          "Playlist name already in use. Please use a different playlist name",
      });
    }
    await Playlist.create({
      userId,
      playlistName,
    });
    return res.send({ message: "Playlist added successfully!" });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return res.status(500).send({ message: "Error creating playlist." });
  }
};

//getting playlists by sort (asc)defult and search (optional)
//if only userId comes get all playlist to show the all playlist for particular user
//if both userId and playlistId comes get fetch the songs from that playlist by join to 
//show the playlist songs for that particulat playlist

exports.getPlaylists = async (req, res) => {
  try {
    const { userId, search, sortOption, playlistId } = req.query;

    if (userId && !playlistId) {
      const whereCondition = {
        userId,
      };

      if (search && search.length >= 3) {
        whereCondition.playlistName = { [Op.like]: `%${search}%` };
      }

      let order = [["playlistName", "ASC"]];

      if (sortOption === "desc") {
        order = [["playlistName", "DESC"]];
      }
    
      const playlists = await Playlist.findAll({
        where: whereCondition,
        order,
      });

      return res.json(playlists);
    } else if (playlistId && userId) {
      const playlist = await Playlist.findOne({
        where: { id: playlistId },
        include: [
          {
            model: SongToPlaylist,
            as: "songsInPlaylist",
            include: [
              {
                model: Songs,
                as: "song",
                include: [
                  {
                    model: LikedSongs,
                    as: "likedSong",
                    where: { userId },
                    attributes: ["isLike"],
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      return res.json(playlist);
    } else {
      return res.status(400).json({ error: "Invalid query params" });
    }
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return res.status(500).json({ message: "Error fetching playlists." });
  }
};

//update playlist and delete playlist 
//if updateId comes in it update the playlist by playlist Name
//if delete id comes in it delete the playlist by id
exports.updatePlaylist = async (req, res) => {
  try {
    const { updateId, playlistName, deleteId } = req.query;

    if (updateId && !deleteId) {
      const playlist = await Playlist.findOne({ where: { id: updateId } });
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      playlist.playlistName = playlistName;
      await playlist.save();

      return res.json(playlist);
    } else if (deleteId && !updateId) {
      await Playlist.destroy({ where: { id: deleteId } });
      return res.json({ message: "Playlist deleted successfully!" });
    } else {
      return res.status(400).json({ error: "Invalid query params" });
    }
  } catch (error) {
    console.error("Error updating playlist:", error);
    return res.status(500).json({ message: "Error updating playlist." });
  }
};
