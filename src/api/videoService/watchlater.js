import axios from 'axios';

const getAllWatchlater = async () => {
  const token = JSON.parse(localStorage.getItem('token'));

  const getAllWatchlaterBaseUrl = '/api/user/watchlater';
  try {
    const {
      data: { watchlater },
      status,
    } = await axios.get(getAllWatchlaterBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return watchlater;
    else {
      throw new Error("Couldn't get watchlater");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addVideoToWatchlater = async (video) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const addVideoToWatchlaterBaseUrl = '/api/user/watchlater';
  try {
    const {
      data: { watchlater },
      status,
    } = await axios.post(
      addVideoToWatchlaterBaseUrl,
      {
        video: video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status >= 200 && status <= 300) return watchlater;
    else {
      throw new Error("Couldn't add to watchlater");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteVideoFromWatchlater = async (videoId) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const deleteVideoFromWatchlaterBaseUrl = `/api/user/watchlater/${videoId}`;
  try {
    const {
      data: { watchlater },
      status,
    } = await axios.delete(deleteVideoFromWatchlaterBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return watchlater;
    else {
      throw new Error("Couldn't delete from watchlater");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllWatchlater, addVideoToWatchlater, deleteVideoFromWatchlater };
