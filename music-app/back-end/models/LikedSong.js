const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/db");
const crypto = require("crypto");
const Songs = require("./Songs");

const LikedSongs = sequelize.define(
  "likedSongs",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    songId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLike: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
  },
  {
    timestamps: true,
  }
);


sequelize
  .sync()
  .then(() => {
    console.log("playlists table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create playlists table:", error);
  });

module.exports = LikedSongs;
