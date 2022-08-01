import React, { useEffect, useState } from 'react';
import './videoContainer.scss';
import { useVideo } from '../../../context';
import { VideoCard } from '../../';
import {
  getVideosByFilter,
  getvideosBySort,
  searchVideos,
} from '../../../utils';

const VideoContainer = () => {
  const { videoState } = useVideo();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const { videos, sortBy, searchQuery, categorizedBy } = videoState;
  useEffect(() => {
    const videosByFilter = getVideosByFilter(categorizedBy, videos);
    const videosBySort = getvideosBySort(sortBy, videosByFilter);
    const videosBySearch = searchVideos(searchQuery, videosBySort);
    setSelectedVideos([...videosBySearch]);
  }, [videoState]);
  return (
    <div className='video-container'>
      {selectedVideos.map((video) => (
        <VideoCard video={video} key={video.id} />
      ))}
      {selectedVideos.length === 0 && (
        <p className='text-centered text-l mx-auto'>No videos found!</p>
      )}
    </div>
  );
};

export { VideoContainer };
