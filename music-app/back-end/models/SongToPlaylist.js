const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/db");
const crypto = require("crypto");
const Playlist = require("./Playlist");
const Songs = require("./Songs");

const SongToPlaylist = sequelize.define(
  "songToPlaylist",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    playlistId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    songId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'favourite',
    },
  },
  {
    timestamps: true,
  }
);


SongToPlaylist.belongsTo(Songs, { as: 'song', foreignKey: 'songId' });


sequelize
  .sync()
  .then(() => {
    console.log("songToPlaylist table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create songToPlaylist table:", error);
  });

module.exports = SongToPlaylist;
