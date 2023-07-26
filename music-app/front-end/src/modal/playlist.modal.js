import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';
import { addSongToPlaylist } from '../actions/playlistActions';

const PlaylistModal = ({ selectedSong, onClose }) => {
  const playlists = useSelector((state) => state.playlist.playlists);
  const dispatch = useDispatch();

  const handleAddToPlaylist = (playlistId) => {
    const songData = {
      songId: selectedSong.id,
      playlistId: playlistId,
    };
    dispatch(addSongToPlaylist(songData));
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: '#2196F3', color: '#fff' }}>Add Song to Playlist</DialogTitle>
      <DialogContent>
        <p style={{ color: '#666' }}>Select a playlist to add the song "{selectedSong.title}" to:</p>
        {playlists.length > 0 ? (
          <List>
            {playlists.map((playlist) => (
              <ListItem button key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
                <ListItemText primary={playlist.playlistName} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No playlists found.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistModal;
