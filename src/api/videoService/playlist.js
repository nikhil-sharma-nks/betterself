import axios from 'axios';

const getAllPlaylist = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const allPlaylistsBaseUrl = '/api/user/playlists';
  try {
    const {
      data: { playlists },
      status,
    } = await axios.get(allPlaylistsBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return playlists;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const createPlaylist = async (title, description = '') => {
  const token = JSON.parse(localStorage.getItem('token'));
  const createPlaylistBaseUrl = '/api/user/playlists';
  try {
    const {
      data: { playlists },
      status,
    } = await axios.post(
      createPlaylistBaseUrl,
      {
        playlist: {
          title: title,
          description: description,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status >= 200 && status <= 300) return playlists;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deletePlaylist = async (playlistId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const deletePlaylistBaseUrl = '/api/user/playlists/' + playlistId;
  try {
    const {
      data: { playlists },
      status,
    } = await axios.delete(deletePlaylistBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return playlists;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getVideosInPlaylist = async (playlistId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const getVideosInPlaylistBaseUrl = '/api/user/playlists/' + playlistId;
  try {
    const {
      data: { playlist },
      status,
    } = await axios.get(getVideosInPlaylistBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    console.log(getVideosInPlaylistBaseUrl);
    console.log({ playlist });
    if (status >= 200 && status <= 300) return playlist;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addVideoInPlaylist = async (playlistId, video) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const addVideoInPlaylistBaseUrl = '/api/user/playlists/' + playlistId;
  try {
    const {
      data: { playlist },
      status,
    } = await axios.post(
      addVideoInPlaylistBaseUrl,
      {
        video: video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status >= 200 && status <= 300) return playlist;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteVideoFromPlaylist = async (playlistId, videoId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const deleteVideoFromPlaylistBaseUrl = `/api/user/playlists/${playlistId}/${videoId}`;
  try {
    const {
      data: { playlist },
      status,
    } = await axios.delete(deleteVideoFromPlaylistBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return playlist;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllPlaylist,
  createPlaylist,
  deletePlaylist,
  getVideosInPlaylist,
  addVideoInPlaylist,
  deleteVideoFromPlaylist,
};
