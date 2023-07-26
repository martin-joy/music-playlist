const LikedSongs = require("../models/LikedSong");
const Songs = require("../models/Songs");
const { Op } = require("sequelize");

//create song in song table 

exports.createSong = async (req, res) => {
  try {
    const songsList = req.body;
    const existingSong = await Songs.findOne({ where: { id: songsList.id } });
    if (existingSong) {
      return res.status(409).json({ message: "Song already exists " });
    }
    const newSong = await Songs.bulkCreate(songsList);
    res.status(201).json(newSong);
  } catch (error) {
    console.error("Unable to create song:", error);
    res.status(500).json({ error: "Unable to create song" });
  }
};

//getting songs with sort and search 
//getting songs with liked or not by joining likeSong table

exports.getSongs = async (req, res) => {
  try {
    const { searchQuery, sortOption, userId } = req.query;
    let allSongs;
    let order = [["title", "ASC"]];
    if (sortOption === "desc") {
      order = [["title", "DESC"]];
    }

    if (searchQuery && searchQuery.length >= 3) {
      allSongs = await Songs.findAll({
        where: {
          title: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
        include: [
          {
            model: LikedSongs,
            as: 'likedSong', 
            where: { userId },
            required: false,
          },
        ],
        order,
      });
    } else {
      allSongs = await Songs.findAll({
        include: [
          {
            model: LikedSongs,
            as: 'likedSong', 
            where: { userId },
            required: false,
          },
        ],
        order,
      });
    }
    res.json(allSongs);
  } catch (error) {
    console.error("Error while fetching songs:", error);
    res.status(500).json({ error: "Unable to fetch songs" });
  }
};