import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createPlaylist, editPlaylist, fetchPlaylists } from "../actions/playlistActions";
import { useDispatch } from "react-redux";
import { warning } from "../utils/shared.service";

const CreatePlaylistModal = ({ closeModal, isEditMode, playlistId, playlistName }) => {
  const dispatch = useDispatch();
  const [inputPlaylistName, setInputPlaylistName] = useState(playlistName || "");

  const handleCreateOrUpdatePlaylist = () => {
    if (isEditMode) {
      dispatch(editPlaylist(playlistId, inputPlaylistName)).then(() => {
        closeModal();
      }).catch((error) => {
        warning("Error editing playlist:", "error");
      });
    } else {
      dispatch(createPlaylist(inputPlaylistName)).then(() => {
        closeModal();
        dispatch(fetchPlaylists()).catch((error) => {
          warning("Error fetching playlists after creating playlist:", "error");
        });
      }).catch((error) => {
        warning("Error creating playlist:", "error");
      });
    }
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{isEditMode ? "Edit Playlist" : "Create Playlist"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Playlist Name"
          variant="outlined"
          value={inputPlaylistName}
          onChange={(e) => setInputPlaylistName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateOrUpdatePlaylist} variant="contained" color="primary">
          {isEditMode ? "Save" : "Create"}
        </Button>
        <Button onClick={closeModal} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistModal;
