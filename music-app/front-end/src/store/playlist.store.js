// store/playlistStore.js
import { createStore } from 'redux';
import playlistReducer from '../reducers/playlistReducer';

const playlistStore = createStore(playlistReducer);

export default playlistStore;
