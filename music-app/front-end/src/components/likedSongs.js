import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLikedSongs, createSongLike, emptyPlaylist } from "../actions/songActions";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { warning } from "../utils/shared.service";

const LikedSongs = () => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.songs);
 
  useEffect(() => {
    dispatch(fetchLikedSongs());
  }, [dispatch]);
  
  const handleLikeClick = async (songId) => {
    try {
      await dispatch(createSongLike(songId));
      dispatch(fetchLikedSongs());
    } catch (error) {
      warning("Error updating song like or fetching liked songs:", "error");
    }
  };

  const handleChange = () => {
    dispatch(emptyPlaylist());
  };
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Favorite Songs</h1>
        <Button
          component={Link}
          to={`/songs`}
          onClick={handleChange}
          variant="contained"
          color="primary"
          style={{ height: "40px", marginTop: "16px" }}
        >
          Back
        </Button>
      </div>
      <Grid container spacing={2}>
        {likedSongs.length > 0 ? (
          likedSongs.map((song) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="200" image={song.image} alt="Song Cover" />
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
                    onClick={() => handleLikeClick(song.id)}
                  >
                   {song.isLike ? <Favorite style={{ fill: "red" }} /> : <FavoriteBorder />}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">........No liked songs found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default LikedSongs;
