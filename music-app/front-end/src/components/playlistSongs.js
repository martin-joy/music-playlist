import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { emptyPlaylist, fetchPlaylistSongs, createSongLike, removeSongFromPlaylist } from '../actions/songActions';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { warning } from '../utils/shared.service';
import '../css/playSongListStyles.css'; 

const PlaySongList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchPlaylistSongs(id)).catch((error) => {
      warning('Error fetching songs:', "error");
    });
  }, [dispatch, id]);

  const handleRemoveFromPlaylist = async (playlistId, songId) => {
    await dispatch(removeSongFromPlaylist(playlistId, songId));
    dispatch(fetchPlaylistSongs(id));
  };

  const handleLikeClick = async (songId) => {
    try {
      await dispatch(createSongLike(songId));
      dispatch(fetchPlaylistSongs(id));
    } catch (error) {
      console.log("Error updating song like or fetching playlist songs:", error);
    }
  };

  const handleChange = () => {
    dispatch(emptyPlaylist());
  };

  return (
    <div className="container">
      <div className="playlistHeader">
        <h2>Selected Playlist Songs:</h2>
        <Button
          component={Link}
          to={`/playlist`}
          onClick={handleChange}
          variant="contained"
          color="primary"
          className="backButton"
        >
          Back
        </Button>
      </div>
      <Grid container spacing={2}>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <Card className="songCard">
                <CardMedia component="img" height="200" image={song.image} alt="Song Cover" className="songImage" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" className="songTitle">
                    {song.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" className="songArtist">
                    {song.artistName}
                  </Typography>
                  <audio controls src={song.preview} className="audioControl"></audio>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleRemoveFromPlaylist(id, song.id)}>
                    Remove from Playlist
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleLikeClick(song.id)}
                  >
                    {song.isLike ? <Favorite style={{ fill: "red" }} /> : <FavoriteBorder />}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No songs found for the selected playlist.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default PlaySongList;
