import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyPlaylist,
  fetchSongs,
  createSongLike,
} from "../actions/songActions";
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
import { Spin } from "antd";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import PlaylistModal from "../modal/playlist.modal";
import { Link, useNavigate } from "react-router-dom";
import WarningModal from "../utils/shared.service";

const SongsList = () => {
  const songs = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchSongs());
        await dispatch(fetchPlaylists());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showPlaylistModal, setPlaylistShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleAddToPlaylist = (song) => {
    if (isLoggedIn) {
      setSelectedSong(song);
      setPlaylistShowModal(true);
    } else {
      setShowModal(true);
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

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  };

  const handleLikeClick = async (songId) => {
    try {
      if (isLoggedIn) {
        await dispatch(createSongLike(songId));
        dispatch(fetchSongs());
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.log(
        "Error updating song like or fetching playlist songs:",
        error
      );
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {isLoggedIn && (
          <Button
            onClick={logout}
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            logout
          </Button>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Songs List</h1>
        <Button
          component={Link}
          to={`/`}
          variant="contained"
          color="primary"
          style={{ height: "40px", marginTop: "16px" }}
        >
          Back
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {isLoggedIn && (
            <Button
              onClick={() => handleMyPlaylistClick("liked-songs")}
              variant="contained"
              color="primary"
              style={{
                marginBottom: "80px",
                marginTop: "20px",
                marginRight: "20px",
              }}
            >
              Favorite Songs
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => handleMyPlaylistClick("my-playlist")}
              variant="contained"
              color="primary"
              className="playlist-link"
              style={{ marginBottom: "80px", marginTop: "20px" }}
            >
              My Playlist
            </Button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginBottom: "80px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search songs by title..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ height: "20px", fontSize: "16px", padding: "8px" }}
          />

          <select
            value={sortOption}
            onChange={handleSortChange}
            style={{
              height: "40px",
              fontSize: "16px",
              marginLeft: "8px",
              marginRight: "8px",
            }}
          >
            <option value="default">Default Order</option>
            <option value="desc">Des (Z-A)</option>
          </select>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <Grid container spacing={2}>
          {songs.map((song) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <Card sx={{ maxWidth: 345 }}>
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
      )}
      {showModal && (
        <WarningModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      {showPlaylistModal && (
        <PlaylistModal
          selectedSong={selectedSong}
          onClose={() => setPlaylistShowModal(false)}
        />
      )}
    </div>
  );
};

export default SongsList;
