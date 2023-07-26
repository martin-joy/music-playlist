// store/songStore.js
import { createStore } from 'redux';
import songReducer from '../reducers/songReducer';

const songStore = createStore(songReducer);

export default songStore;
