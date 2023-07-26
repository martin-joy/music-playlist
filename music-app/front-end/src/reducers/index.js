import { combineReducers } from 'redux';
import songReducer from './songReducers';
import playlistReducer from './playlistReducer';
import userReducer from './userReducer';
// Import your other reducers here

const rootReducer = combineReducers({
  playlist: playlistReducer,
  songs: songReducer,
  users: userReducer,
  // Add other reducers here
});

export default rootReducer;
