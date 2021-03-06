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

const isVideosInLiked = (id, videos) => {
  const foundInLiked = videos?.find((video) => video._id === id);
  return foundInLiked ? true : false;
};

const isVideoInPlaylist = (playlist, videoId) => {
  const searched = playlist.videos.find((video) => video._id === videoId);
  return searched ? true : false;
};
const totalVideosInPlaylists = (playlists) => {
  const total = playlists.reduce(
    (prev, current) => prev + current.videos.length,
    0
  );
  return total;
};

const findVideoInWatchlater = (watchlater, videoId) => {
  const searched = watchlater.find((video) => video._id === videoId);
  return searched ? true : false;
};
export {
  getVideosByFilter,
  getvideosBySort,
  searchVideos,
  isVideosInLiked,
  isVideoInPlaylist,
  totalVideosInPlaylists,
  findVideoInWatchlater
};
