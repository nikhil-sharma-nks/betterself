import axios from 'axios';

const getUserHistory = async () => {
  let token = JSON.parse(localStorage.getItem('token'));
  const getUserHistoryBaseUrl = '/api/user/history';
  try {
    const {
      data: { history },
      status,
    } = await axios.get(getUserHistoryBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return history;
    else {
      throw new Error("Couldn't get history");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addToHistory = async (video) => {
  let token = JSON.parse(localStorage.getItem('token'));
  const addToHistoryBaseUrl = '/api/user/history';
  try {
    const {
      data: { history },
      status,
    } = await axios.post(
      addToHistoryBaseUrl,
      {
        video: video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status >= 200 && status <= 300) return history;
    else {
      throw new Error("Couldn't add to history");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteFromHistory = async (videoId) => {
  let token = JSON.parse(localStorage.getItem('token'));
  const deleteFromHistoryBaseUrl = `/api/user/history/${videoId}`;
  try {
    const {
      data: { history },
      status,
    } = await axios.delete(deleteFromHistoryBaseUrl, {
      headers: {
        authorization: token,
      },
    });

    if (status >= 200 && status <= 300) return history;
    else {
      throw new Error("Couldn't delete from history");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { getUserHistory, addToHistory, deleteFromHistory };
