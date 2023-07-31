import instance from '../utils/api';
import { warning } from '../utils/shared.service';

export const getPlaylists = async (searchQuery='',sortOption='',userId) => {
    try {
        const response = await instance.get(`/playlist?search=${searchQuery}&sortOption=${sortOption}&userId=${userId}`);
        return response;
      } catch (error) {
        warning('Error fetching songs:', "error");
        throw error;
      }
};

export const createSongToPlaylist = async (songData) => {
    try{
  const response = await instance.post(`/songToplaylist?playlistId=${songData.playlistId}&songId=${songData.songId}`);
  return response;
    }catch(error){
      warning('Error in create Song To Playlist', "error");
    }
};

export const addPlaylist = async (userId,playlistName) => {
  try{
  const response = await instance.post(`/playlist?userId=${userId}&playlistName=${playlistName}`);
  return response.data;
  }catch(error){
    warning('Error in create Song To Playlist', "error");
    throw error;
  }
};

export const removePlaylist = async (playlistId) => {
  try{
    const response = await instance.put(`/playlist?deleteId=${playlistId}` );
    return response.data;
  }
 catch(error){
  warning('Error in remove in Playlist', "error");
  throw error;
 }
};

export const updatePlaylist = async (playlistId,updatedPlaylistName) => {
  try {
    const response = await instance.put(`/playlist?updateId=${playlistId}&playlistName=${updatedPlaylistName}`);
  return response.data;
  } catch (error) {
    warning('Error in update in Playlist', "error");
    throw error;
  }
  
};
