const getVideosByFilter = (category, videos) =>
  category !== 'all'
    ? videos.filter((video) => video.category === category)
    : videos;
const getvideosBySort = (sortBy, videos) => {
  if (sortBy === '') return videos;
  switch (sortBy) {
    case 'date-latest': {
      return videos.sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
    }
    case 'date-oldest': {
      return videos
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .reverse();
    }
    case 'popularity': {
      return videos.sort((a, b) => b.views - a.views);
    }
    default:
      return videos;
  }
};
const searchVideos = (query, videos) => {
  if (query === '') return videos;
  const searchvideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.creator.toLowerCase().includes(query.toLowerCase())
  );
  return searchvideos;
};
export { getVideosByFilter, getvideosBySort, searchVideos };
