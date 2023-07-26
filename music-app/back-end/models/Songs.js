const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/db");
const LikedSongs = require("./LikedSong");


const Songs = sequelize.define(
  "songs",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
   
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artistName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preview: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

 Songs.hasMany(LikedSongs, {as: 'likedSong', foreignKey: "songId" });


sequelize
  .sync()
  .then(() => {
    console.log("songs table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create songs table:", error);
  });

module.exports = Songs;
