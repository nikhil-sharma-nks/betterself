import axios from 'axios';

const getAllVideos = async () => {
  const getAllVideosBaseUrl = '/api/videos';
  try {
    const {
      data: { videos },
      status,
    } = await axios.get(getAllVideosBaseUrl);
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

export { getAllVideos, getAllCategories };
