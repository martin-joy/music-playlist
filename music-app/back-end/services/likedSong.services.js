const LikedSongs = require("../models/LikedSong");
const Songs = require("../models/Songs");

//adding liked song to LikedSong table for specific user
//finding if already the liked song existing if its exisiting it gets deleted from table bcz like and dislike call same function
exports.LikedSongs = async (req, res) => {
  try {
    const { songId, userId } = req.query;
    const existingLikesSongs = await LikedSongs.findOne({
      where: { songId, userId },
    });
    if (existingLikesSongs) {
      await existingLikesSongs.destroy();
      return res.status(200).json({message: "successfully deleted"});
    }
    const song = await LikedSongs.create({
      songId,
      userId,
    });
    return res.send({ song });
  } catch (error) {
    console.error("Error creating LikedSong:", error);
    return res.status(500).send({ message: "Error creating LikedSong." });
  }
};

//getting liked songs from likedSong table by join 
//getting songId in song table and filter by userId to get liked song by particular user

exports.getLikedSongs = async (req, res) => {
  try {
    const { userId } = req.query;
    const likedSongs = await Songs.findAll({
      attributes: ["title", "artistName", "preview", "image"],
      include: [
        {
          model: LikedSongs,
          as: "likedSong",
          where: {
            userId: userId,
          },
          attributes: ["songId", "isLike"],
        },
      ],
    });

    res.json(likedSongs);
  } catch (error) {
    console.error("Error while fetching liked songs:", error);
    res.status(500).json({ error: "Unable to fetch liked songs" });
  }
};
