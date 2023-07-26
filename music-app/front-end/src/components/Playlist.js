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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Playlist</h1>
        <Button
          component={Link}
          to="/songs"
          variant="contained"
          color="primary"
          style={{ height: "40px", marginTop: "16px" }}
        >
          Back
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={openModal}
          style={{ marginBottom: "20px" }}
          variant="contained"
          color="primary"
        >
          Create Playlist
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginBottom: "20px",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Search playlists by name..."
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
              <option value="desc">Descending (Z-A)</option>
            </select>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        {playlists.map((playlist) => (
          <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: 275,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Link
                  to={`/playlist/${playlist.id}`}
                  style={{ textDecoration: "none" }}
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
