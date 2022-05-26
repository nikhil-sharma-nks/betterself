import React, { useEffect, useState } from 'react';
import './likes.scss';
import { Sidebar, VideoCard } from '../../components';
import { useVideo } from '../../context';

const Likes = () => {
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    let isAvailable = videoState.likes.length > 0 ? false : true;
    setIsEmpty(isAvailable);
  }, [videoState]);
  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <p className='text-xxl text-centered mt-5'>
              No Liked Video, Please Add First
            </p>
          )}
          <div className='video-container'>
            {videoState.likes.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { Likes };
