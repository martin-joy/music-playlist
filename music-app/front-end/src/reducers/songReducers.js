import {
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_FAILURE,
  FETCH_PLAYLIST_SONGS_SUCCESS,
  FETCH_PLAYLIST_SONGS_FAILURE,
  FETCH_LIKED_SONGS_FAILURE,
  FETCH_LIKED_SONGS_SUCCESS,
  UPDATE_SONG_LIKE_SUCCESS,
  UPDATE_SONG_LIKE_FAILURE,
  EMPTY_PLAYLIST,
  DELETE_PLAYLISTSONGS_SUCCESS,
  DELETE_PLAYLISTSONGS_FAILURE,
} from "../actions/songActions";

const initialState = [];

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS_SUCCESS:
      return action.payload;
    case FETCH_SONGS_FAILURE:
      console.error(action.payload);
      return state;
    case FETCH_LIKED_SONGS_SUCCESS:
      return action.payload;
    case FETCH_LIKED_SONGS_FAILURE:
      console.error(action.payload);
      return state;
    case FETCH_PLAYLIST_SONGS_SUCCESS:
      return action.payload;
    case FETCH_PLAYLIST_SONGS_FAILURE:
    case EMPTY_PLAYLIST:
      return [];
      case UPDATE_SONG_LIKE_SUCCESS:
        return state.filter((song) =>
          song.id === action.payload.songId
            ? { ...song, isLike: action.payload.isLike }
            : song
        );      
    case UPDATE_SONG_LIKE_FAILURE:
      console.error(action.payload);
      return state;
    case DELETE_PLAYLISTSONGS_SUCCESS:
      return state.filter((song) => song.id !== action.payload);
    case DELETE_PLAYLISTSONGS_FAILURE:
      console.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default songReducer;
