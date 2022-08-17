import React, { useEffect, useState } from 'react';
import './likes.scss';
import { Sidebar, VideoCard, Error } from '../../components';
import { useVideo } from '../../context';
import { useNavigate } from 'react-router-dom';

const Likes = () => {
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    let isAvailable = videoState.likes.length > 0 ? false : true;
    setIsEmpty(isAvailable);
  }, [videoState]);
  const navigate = useNavigate();

  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <Error>
              <p className='text-xl'> No Liked Videos</p>
              <p className='text-m'>
                Videos you have liked would appear here, add now!
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
