const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const sequelize = require('./utils/db');
const { PORT } = process.env;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require('./routes/User.routes');
const playlistRoutes = require('./routes/playlist.routes');
const songsRoutes = require('./routes/song.routes');
const songToPlaylistRoutes = require('./routes/songToPlaylist.routes');
const likedSongs = require('./routes/likedSong.routes')
app.use('/api', userRoutes);
app.use('/api',playlistRoutes);
app.use('/api',songsRoutes);
app.use('/api',songToPlaylistRoutes);
app.use('/api',likedSongs);
// Sync models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: http://localhost:${PORT}`);
  });
});
