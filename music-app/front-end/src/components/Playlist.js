import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists, deletePlaylist } from "../actions/playlistActions";
import { Link } from "react-router-dom";
import CreatePlaylistModal from "../modal/CreatePlaylistModal";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { warning } from "../utils/shared.service";
import "../css/playlistStyles.css";
const Playlist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlist.playlists);
  const loading = useSelector((state) => state.playlist.loading);
  const error = useSelector((state) => state.playlist.error);
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [updatedPlaylistName, setUpdatedPlaylistName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const handleDeletePlaylist = (playlistId) => {
    dispatch(deletePlaylist(playlistId)).catch((error) => {
      warning("Error deleting playlist:", "error");
    });
  };

  const handleEditClick = (playlistId, playlistName) => {
    setEditingPlaylistId(playlistId);
    setUpdatedPlaylistName(playlistName);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlaylistId(null);
    setUpdatedPlaylistName("");
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
    dispatch(fetchPlaylists(searchQuery, sortOption));
  };

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading playlists...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <div className="container">
        <h1>Playlist</h1>
        <Button
          component={Link}
          to="/songs"
          variant="contained"
          color="primary"
          className="backButton"
        >
          Back
        </Button>
      </div>
      <div className="container">
        <Button
          onClick={openModal}
          className="createButton"
          variant="contained"
          color="primary"
        >
          Create Playlist
        </Button>
        <div className="searchContainer">
          <div>
            <input
              type="text"
              placeholder="Search playlists by name..."
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
              <option value="desc">Descending (Z-A)</option>
            </select>
          </div>
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

      <Grid container spacing={2}>
        {playlists.map((playlist) => (
          <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="card">
              <CardContent>
                <Link
                  to={`/playlist/${playlist.id}`}
                  className="cardLink"
                >
                  <Typography variant="h6" component="div">
                    {playlist.playlistName}
                  </Typography>
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  variant="outlined"
                >
                  Delete
                </Button>
                <Button
                  onClick={() =>
                    handleEditClick(playlist.id, playlist.playlistName)
                  }
                  variant="outlined"
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isModalOpen && (
        <CreatePlaylistModal
          closeModal={closeModal}
          isEditMode={editingPlaylistId !== null}
          playlistName={updatedPlaylistName}
          playlistId={editingPlaylistId}
        />
      )}
    </div>
  );
};

export default Playlist;
