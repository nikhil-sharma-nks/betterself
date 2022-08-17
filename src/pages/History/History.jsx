import React, { useEffect, useState } from 'react';
import './history.scss';
import { Sidebar, VideoCard, Error } from '../../components';
import { useVideo } from '../../context';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { videoState } = useVideo();
  const [historyCollection, setHistoryCollection] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isAvailable = videoState.history.length > 0 ? false : true;
    setIsEmpty(isAvailable);
    const reversedHistory = [...videoState.history].reverse();
    setHistoryCollection([...reversedHistory]);
  }, [videoState]);
  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page history-page'>
          {isEmpty && (
            <Error>
              <p className='text-xl'>No Videos In History</p>
              <p className='text-m'>
                Videos you have watched would appear here
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
            {historyCollection.map((video) => (
              <VideoCard video={video} key={video._id} fromHistory />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { History };
