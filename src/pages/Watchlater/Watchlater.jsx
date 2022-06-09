import React, { useEffect, useState } from 'react';
import './watchlater.scss';
import { Sidebar, VideoCard } from '../../components';
import { useVideo } from '../../context';
const Watchlater = () => {
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    let isAvailable = videoState.watchlater.length > 0 ? false : true;
    setIsEmpty(isAvailable);
  }, [videoState]);
  return (
    <>
      {' '}
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <p className='text-xxl text-centered mt-5'>
              No Videos In Watchlater. Add Now!
            </p>
          )}
          <div className='video-container'>
            {videoState.watchlater.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { Watchlater };
