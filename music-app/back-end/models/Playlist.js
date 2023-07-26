const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/db");
const crypto = require("crypto");
const SongToPlaylist = require("./SongToPlaylist");

const Playlist = sequelize.define(
  "playlists",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playlistName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'favourite',
    },
  },
  {
    timestamps: true,
  }
);


Playlist.hasMany(SongToPlaylist, { as: 'songsInPlaylist', foreignKey: 'playlistId' });

sequelize
  .sync()
  .then(() => {
    console.log("playlists table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create playlists table:", error);
  });

module.exports = Playlist;
