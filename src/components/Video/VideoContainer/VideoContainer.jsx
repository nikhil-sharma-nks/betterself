import React, { useEffect, useState } from 'react';
import './videoContainer.scss';
import { useVideo } from '../../../context';
import { VideoCard, Error } from '../../';
import {
  getVideosByFilter,
  getvideosBySort,
  searchVideos,
} from '../../../utils';
import { useNavigate } from 'react-router-dom';

const VideoContainer = () => {
  const { videoState, videoDispatch } = useVideo();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const { videos, sortBy, searchQuery, categorizedBy } = videoState;
  useEffect(() => {
    const videosByFilter = getVideosByFilter(categorizedBy, videos);
    const videosBySort = getvideosBySort(sortBy, videosByFilter);
    const videosBySearch = searchVideos(searchQuery, videosBySort);
    setSelectedVideos([...videosBySearch]);
  }, [videoState]);
  const navigate = useNavigate();

  return (
    <div className='video-container'>
      {selectedVideos.map((video) => (
        <VideoCard video={video} key={video.id} />
      ))}
      {selectedVideos.length === 0 && (
        <Error>
          <p className='text-xl'>
            No Video Was Found With Name "{videoState.searchQuery}"
          </p>
          {/* <p className='text-m'>
            Videos you have liked would appear here, add now!
          </p> */}
          <div>
            <button
              className='btn btn-primary'
              onClick={() =>
                videoDispatch({
                  type: 'SEARCH_QUERY',
                  payload: '',
                })
              }
            >
              Clear Search
            </button>
          </div>
        </Error>
      )}
    </div>
  );
};

export { VideoContainer };
