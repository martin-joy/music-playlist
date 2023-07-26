import { addPlaylist, createSongToPlaylist, getPlaylists, removePlaylist, updatePlaylist } from '../controllers/playlist.controllers';
import { warning } from '../utils/shared.service';

export const FETCH_PLAYLISTS_REQUEST = 'FETCH_PLAYLISTS_REQUEST';
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
export const FETCH_PLAYLISTS_FAILURE = 'FETCH_PLAYLISTS_FAILURE';
export const ADD_SONG_TO_PLAYLIST_REQUEST = 'ADD_SONG_TO_PLAYLIST_REQUEST';
export const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS';
export const ADD_SONG_TO_PLAYLIST_FAILURE = 'ADD_SONG_TO_PLAYLIST_FAILURE';
export const DELETE_PLAYLIST_REQUEST = 'DELETE_PLAYLIST_REQUEST';
export const DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS';
export const DELETE_PLAYLIST_FAILURE = 'DELETE_PLAYLIST_FAILURE';
export const EDIT_PLAYLIST_REQUEST = 'EDIT_PLAYLIST_REQUEST';
export const EDIT_PLAYLIST_SUCCESS = 'EDIT_PLAYLIST_SUCCESS';
export const EDIT_PLAYLIST_FAILURE = 'EDIT_PLAYLIST_FAILURE';
export const CREATE_PLAYLIST_REQUEST = 'CREATE_PLAYLIST_REQUEST';
export const CREATE_PLAYLIST_SUCCESS = 'CREATE_PLAYLIST_SUCCESS';
export const CREATE_PLAYLIST_FAILURE = 'CREATE_PLAYLIST_FAILURE';

export const createPlaylistRequest = () => {
  return {
    type: CREATE_PLAYLIST_REQUEST,
  };
};

export const createPlaylistSuccess = (playlist) => {
  return {
    type: CREATE_PLAYLIST_SUCCESS,
    payload: playlist,
  };
};


export const createPlaylistFailure = (error) => {
  return {
    type: CREATE_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const editPlaylistRequest = () => {
  return {
    type: EDIT_PLAYLIST_REQUEST,
  };
};

export const editPlaylistSuccess = (playlistId, updatedPlaylistName) => {
  return {
    type: EDIT_PLAYLIST_SUCCESS,
    payload: {
      playlistId,
      updatedPlaylistName,
    },
  };
};

export const editPlaylistFailure = (error) => {
  return {
    type: EDIT_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const addSongToPlaylistRequest = () => {
  return {
    type: ADD_SONG_TO_PLAYLIST_REQUEST,
  };
};

export const addSongToPlaylistSuccess = (playlistId, songId) => {
  return {
    type: ADD_SONG_TO_PLAYLIST_SUCCESS,
    payload: {
      playlistId,
      songId,
    },
  };
};

export const addSongToPlaylistFailure = (error) => {
  return {
    type: ADD_SONG_TO_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const fetchPlaylistsRequest = () => {
  return {
    type: FETCH_PLAYLISTS_REQUEST,
  };
};

export const fetchPlaylistsSuccess = (playlists) => {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    payload: playlists,
  };
};

export const fetchPlaylistsFailure = (error) => {
  return {
    type: FETCH_PLAYLISTS_FAILURE,
    payload: error,
  };
};

export const deletePlaylistRequest = () => {
  return {
    type: DELETE_PLAYLIST_REQUEST,
  };
};

export const deletePlaylistSuccess = (playlistId) => {
  return {
    type: DELETE_PLAYLIST_SUCCESS,
    payload: playlistId,
  };
};

export const deletePlaylistFailure = (error) => {
  return {
    type: DELETE_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const fetchPlaylists = (searchQuery, sortOption) => {
  return async (dispatch) => {
    dispatch(fetchPlaylistsRequest());
    try {
      const userId = localStorage.getItem('userId');
      const response =await getPlaylists(searchQuery,sortOption,userId);
      dispatch(fetchPlaylistsSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchPlaylistsFailure(error.message));
    }
  };
};

export const addSongToPlaylist = (songData) => {
  return async (dispatch) => {
    dispatch(addSongToPlaylistRequest());

    try {
      const response = await createSongToPlaylist(songData)
      const { playlistId: updatedPlaylistId, songId: updatedSongId } = response.data;
      dispatch(addSongToPlaylistSuccess(updatedPlaylistId, updatedSongId));
      warning("song sucessfully added","success")
    } catch (error) {
      dispatch(addSongToPlaylistFailure(error.message));
    }
  };
};

export const createPlaylist = (playlistName) => {
  return async (dispatch) => {
    dispatch(createPlaylistRequest());

    try {
      const userId = localStorage.getItem('userId');
      const newPlaylist = await addPlaylist(userId,playlistName);
      dispatch(createPlaylistSuccess(newPlaylist));
      warning("playlist sucessfully created","success")
      return newPlaylist;
    } catch (error) {
      dispatch(createPlaylistFailure(error.message));
      throw error;
    }
  };
};

export const deletePlaylist = (playlistId) => {
  return async (dispatch) => {
    dispatch(deletePlaylistRequest());
    try {
       await removePlaylist(playlistId);
      dispatch(deletePlaylistSuccess(playlistId));
      warning("playlist sucessfully deleted","success")
    } catch (error) {
      dispatch(deletePlaylistFailure(error.message));
    }
  };
};

export const editPlaylist = (playlistId, updatedPlaylistName) => {
  return async (dispatch) => {
    dispatch(editPlaylistRequest());
    try {
      await updatePlaylist(playlistId,updatedPlaylistName);
      dispatch(editPlaylistSuccess(playlistId, updatedPlaylistName));
      warning("playlist sucessfully edited","success")
    } catch (error) {
      dispatch(editPlaylistFailure(error.message));
    }
  };
};
