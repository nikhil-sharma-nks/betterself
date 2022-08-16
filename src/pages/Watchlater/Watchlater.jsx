import React, { useEffect, useState } from 'react';
import './watchlater.scss';
import { Sidebar, VideoCard, Error } from '../../components';
import { useVideo } from '../../context';
import { useNavigate } from 'react-router-dom';

const Watchlater = () => {
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    let isAvailable = videoState.watchlater.length > 0 ? false : true;
    setIsEmpty(isAvailable);
  }, [videoState]);
  const navigate = useNavigate();

  return (
    <>
      {' '}
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <Error>
              <p className='text-xl'> No Videos In Watch Later</p>
              <p className='text-m'>
                Videos you have added to watch later would appear here, add now!
              </p>
              <div>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    navigate('/home');
                  }}
                >
                  Go To Home
                </button>
              </div>
            </Error>
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
