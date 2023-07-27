import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyPlaylist, fetchSongs, createSongLike } from "../actions/songActions";
import { fetchPlaylists } from "../actions/playlistActions";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import PlaylistModal from "../modal/playlist.modal";
import { Link, useNavigate } from "react-router-dom";
import { warning } from "../utils/shared.service";
import "../css/songsListStyles.css";
const SongsList = () => {
  const songs = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowModal(true);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  const handleLikeClick = async (songId) => {
    try {
      await dispatch(createSongLike(songId));
      dispatch(fetchSongs());
    } catch (error) {
      warning("Error updating song like or fetching playlist songs:", "error");
    }
  };

  const handleMyPlaylistClick = (playlistType) => {
    if (playlistType === "liked-songs") {
      navigate("/likedSongs");
      dispatch(emptyPlaylist());
    } else {
      navigate("/playlist");
      dispatch(emptyPlaylist()); 
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortOption(value);
  };

  const handleSearchSubmit = () => {
    dispatch(fetchSongs(searchQuery, sortOption));
  };

  return (
    <div className="container">
      <div className="modalContainer">
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
          className="logoutButton"
        >
          Logout
        </Button>
      </div>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Songs List</h1>
          <Button
            component={Link}
            to={`/`}
            variant="contained"
            color="primary"
            className="backButton"
          >
            Back
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              onClick={() => handleMyPlaylistClick("liked-songs")}
              variant="contained"
              color="primary"
              className="playlistButton"
            >
              Favorite Songs
            </Button>
            <Button
              onClick={() => handleMyPlaylistClick("my-playlist")}
              variant="contained"
              color="primary"
              className="playlistButton playlist-link"
            >
              My Playlist
            </Button>
          </div>
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search songs by title..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="searchInput"
            />

            <select
              value={sortOption}
              onChange={handleSortChange}
              className="sortSelect"
            >
              <option value="default">Default Order</option>
              <option value="desc">Des (Z-A)</option>
            </select>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchSubmit}
              className="searchButton"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <Grid container spacing={2}>
        {songs.map((song) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
            <Card className="card">
              <CardMedia
                component="img"
                height="200"
                image={song.image}
                alt="Song Cover"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {song.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {song.artistName}
                </Typography>
                <audio controls src={song.preview}></audio>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleAddToPlaylist(song)}
                >
                  Add to Playlist
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleLikeClick(song.id)}
                >
                  {song.isLike ? (
                    <Favorite style={{ fill: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {showModal && (
        <PlaylistModal
          selectedSong={selectedSong}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SongsList;