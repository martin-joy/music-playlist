import {
  FETCH_PLAYLISTS_REQUEST,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_FAILURE,
  ADD_SONG_TO_PLAYLIST_REQUEST,
  ADD_SONG_TO_PLAYLIST_SUCCESS,
  ADD_SONG_TO_PLAYLIST_FAILURE,
  EDIT_PLAYLIST_REQUEST,
  EDIT_PLAYLIST_SUCCESS,
  EDIT_PLAYLIST_FAILURE,
  DELETE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILURE,
} from '../actions/playlistActions';

const initialState = {
  playlists: [],
  loading: false,
  error: null,
  addingSongToPlaylist: false,
  addSongToPlaylistError: null,
  deletingPlaylist: false,
  deletePlaylistError: null,
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SONG_TO_PLAYLIST_REQUEST:
      return {
        ...state,
        addingSongToPlaylist: true,
        addSongToPlaylistError: null,
      };
    case ADD_SONG_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        addingSongToPlaylist: false,
      };
    case ADD_SONG_TO_PLAYLIST_FAILURE:
      return {
        ...state,
        addingSongToPlaylist: false,
        addSongToPlaylistError: action.payload,
      };
      case EDIT_PLAYLIST_REQUEST:
        return {
          ...state,
          editingPlaylist: true,
          editPlaylistError: null,
        };
      case EDIT_PLAYLIST_SUCCESS:
        const { playlistId, updatedPlaylistName } = action.payload;
        return {
          ...state,
          editingPlaylist: false,
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId ? { ...playlist, playlistName: updatedPlaylistName } : playlist
          ),
        };
      case EDIT_PLAYLIST_FAILURE:
        return {
          ...state,
          editingPlaylist: false,
          editPlaylistError: action.payload,
        };
    case DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        deletingPlaylist: true,
        deletePlaylistError: null,
      };
    case DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        deletingPlaylist: false,
        playlists: state.playlists.filter((playlist) => playlist.id !== action.payload),
      };
    case DELETE_PLAYLIST_FAILURE:
      return {
        ...state,
        deletingPlaylist: false,
        deletePlaylistError: action.payload,
      };
    default:
      return state;
  }
};

export default playlistReducer;
