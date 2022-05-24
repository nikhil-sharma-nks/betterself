import axios from 'axios';

const getAllProducts = async () => {
  const getAllProductsBaseUrl = '/api/videos';
  try {
    const {
      data: { videos },
      status,
    } = await axios.get(getAllProductsBaseUrl);
    if (status >= 200 && status <= 300) return videos;
    else {
      throw new Error("Couldn't get videos");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllCategories = async () => {
  const getAllCategoriesBaseUrl = '/api/categories';
  try {
    const {
      data: { categories },
      status,
    } = await axios.get(getAllCategoriesBaseUrl);
    if (status >= 200 && status <= 300) return categories;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//LIKED
const getUserLikedVideos = async () => {
  let token = JSON.parse(localStorage.getItem('token'));
  const getUserLikedVideosBaseUrl = '/api/user/likes';
  try {
    const {
      data: { likes },
      status,
    } = await axios.get(getUserLikedVideosBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return likes;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addToLikedVideos = async (video) => {
  let token = JSON.parse(localStorage.getItem('token'));
  const addToLikedVideosBaseUrl = '/api/user/likes';
  try {
    const {
      data: { likes },
      status,
    } = await axios.post(
      addToLikedVideosBaseUrl,
      {
        video: video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status >= 200 && status <= 300) return likes;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteFromLikedVideos = async (videoId) => {
  let token = JSON.parse(localStorage.getItem('token'));
  const deleteFromLikedVideosBaseUrl = `/api/user/likes/${videoId}`;
  try {
    const {
      data: { likes },
      status,
    } = await axios.delete(deleteFromLikedVideosBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return likes;
    else {
      throw new Error("Couldn't get categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllProducts,
  getAllCategories,
  getUserLikedVideos,
  addToLikedVideos,
  deleteFromLikedVideos,
};
