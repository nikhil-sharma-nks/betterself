import React, { useEffect, useState } from 'react';
import './history.scss';
import { Sidebar, VideoCard } from '../../components';
import { useVideo } from '../../context';

const History = () => {
  const { videoState } = useVideo();
  const [historyCollection, setHistoryCollection] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
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
            <p className='text-xxl text-centered mt-5'>No Video In History</p>
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
