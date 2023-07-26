import { addSongTOLikedSong, deleteSongPlaylist, getPlaylistSong, getSongsApi,getLikedSongs } from "../controllers/song.controllers";
import { warning } from "../utils/shared.service";


export const FETCH_SONGS_SUCCESS = "FETCH_SONGS_SUCCESS";
export const FETCH_SONGS_FAILURE = "FETCH_SONGS_FAILURE";
export const FETCH_PLAYLIST_SONGS_SUCCESS = "FETCH_PLAYLIST_SONGS_SUCCESS";
export const FETCH_PLAYLIST_SONGS_FAILURE = "FETCH_PLAYLIST_SONGS_FAILURE";
export const UPDATE_SONG_LIKE_SUCCESS = "UPDATE_SONG_LIKE_SUCCESS";
export const UPDATE_SONG_LIKE_FAILURE = "UPDATE_SONG_LIKE_FAILURE";
export const EMPTY_PLAYLIST = "EMPTY_PLAYLIST";
export const DELETE_PLAYLISTSONGS_SUCCESS = "DELETE_PLAYLISTSONGS_SUCCESS";
export const DELETE_PLAYLISTSONGS_FAILURE = "DELETE_PLAYLISTSONGS_FAILURE";
export const FETCH_LIKED_SONGS_FAILURE = "FETCH_LIKED_SONGS_FAILURE";
export const FETCH_LIKED_SONGS_SUCCESS = "FETCH_LIKED_SONGS_SUCCESS";

export const fetchSongsSuccess = (songs) => ({
  type: FETCH_SONGS_SUCCESS,
  payload: songs,
});

export const fetchSongsFailure = (error) => ({
  type: FETCH_SONGS_FAILURE,
  payload: error,
});

export const emptyPlaylist = () => ({
  type: EMPTY_PLAYLIST,
});

export const fetchPlaylistSongsSuccess = (songsList) => ({
  type: FETCH_PLAYLIST_SONGS_SUCCESS,
  payload: songsList,
});

export const fetchLikedSongsSuccess = (songsList) => ({
  type: FETCH_LIKED_SONGS_SUCCESS,
  payload: songsList,
});

export const fetchLikedSongsFailure = (error) => ({
  type: FETCH_LIKED_SONGS_FAILURE,
  payload: error,
});

export const fetchPlaylistSongsFailure = (error) => ({
  type: FETCH_PLAYLIST_SONGS_FAILURE,
  payload: error,
});

export const updateSongLikeSuccess = (songId, isLike) => ({
  type: UPDATE_SONG_LIKE_SUCCESS,
  payload: {
    songId,
    isLike,
  },
});

export const updateSongLikeFailure = (error) => ({
  type: UPDATE_SONG_LIKE_FAILURE,
  payload: error,
});

export const removePlaylistSongsSuccess = (playlistId) => ({
  type: DELETE_PLAYLISTSONGS_SUCCESS,
  payload: playlistId,
});

export const removePlaylistSongsFailure = (error) => ({
  type: DELETE_PLAYLISTSONGS_FAILURE,
  payload: error,
});


export const fetchSongs = (searchQuery, sortOption) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const songsData = await getSongsApi(searchQuery,sortOption,userId);
      const songsList = songsData.map((song) => {
        const likedSongEntry =song.likedSong[0]
        return {
          id: song.id,
          title: song.title,
          artistName: song.artistName,
          preview: song.preview,
          image: song.image,
          isLike: likedSongEntry ? likedSongEntry.isLike : false,
        };
      });

      dispatch(fetchSongsSuccess(songsList));
    } catch (error) {
      console.error(error);
      dispatch(fetchSongsFailure(error.message));
    }
  };
};


export const fetchPlaylistSongs = (playlistId) => {
  return async (dispatch) => {
    try { 
      const userId = localStorage.getItem("userId");
      const songsData = await getPlaylistSong(playlistId,userId)
      const songsList = songsData.map((song) => {
        const likedSong=song.song.likedSong[0]
       return {
        id: song.song.id,
        title: song.song.title,
        artistName: song.song.artistName,
        preview: song.song.preview,
        image: song.song.image,
        isLike: likedSong ? likedSong.isLike : false,
      }});
      dispatch(fetchPlaylistSongsSuccess(songsList));
    } catch (error) {
      console.error(error);
      dispatch(fetchPlaylistSongsFailure(error.message));
    }
  };
};


export const removeSongFromPlaylist = (playlistId, songId) => {
  return async (dispatch) => {
    try {
      const response = await deleteSongPlaylist(playlistId,songId)
      dispatch(removePlaylistSongsSuccess(response));
      warning("remove song from playlist","success")
    } catch (error) {
      console.error(error);
      dispatch(removePlaylistSongsFailure(error.message));
    }
  };
};


export const createSongLike = (songId) => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("userId")
      const response = await addSongTOLikedSong(songId,userId)
      dispatch(updateSongLikeSuccess(response.data.song.songId,response.data.song.isLike)); 
     
    } catch (error) {
      console.error(error);
      dispatch(updateSongLikeFailure(error.message));
    }
  };
};

export const fetchLikedSongs = () => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("userId");
      const songsData =await getLikedSongs(userId)
      const songsList = songsData.map((song) => {
        return {
          id: song.likedSong[0].songId,
          title: song.title,
          artistName: song.artistName,
          preview: song.preview,
          image: song.image,
          isLike: true,
        };
      });
      dispatch(fetchLikedSongsSuccess(songsList));
    } catch (error) {
      console.error(error);
      dispatch(fetchLikedSongsFailure(error.message));
    }
  };
};