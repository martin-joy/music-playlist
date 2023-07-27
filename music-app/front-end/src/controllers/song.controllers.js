import instance from '../utils/api';

export const getSongsApi = async (searchQuery='', sortOption='', userId) => {
    try {
      const response = await instance.get(`/songs?searchQuery=${searchQuery}&sortOption=${sortOption}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  };
  
export const getPlaylistSong = async (playlistId,userId) => {
  try {
    const response = await instance.get(`/playlist?playlistId=${playlistId}&userId=${userId}`);
    return response.data.songsInPlaylist;
  } catch (error) {
    throw error
  }
 
};

export const deleteSongPlaylist = async (playlistId,songId) => {
  try {
    const response = await instance.put(`/songToplaylist?playlistId=${playlistId}&songId=${songId}`);
    return response.data;
  } catch (error) {
    throw error
  }

};

export const addSongTOLikedSong = async (songId,userId) => {
  try {
    const response = await instance.post(`/likedSongs?songId=${songId}&userId=${userId}`);
  return response;
  } catch (error) {
    throw error
  }
  
};

export const getLikedSongs = async (userId) => {
  try {
    const response = await instance.get(`/likedSongs?userId=${userId}`);
    return response.data
  } catch (error) {
    throw error
  }

};
