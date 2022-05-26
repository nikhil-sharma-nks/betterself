import React, { useEffect, useState } from 'react';
import './singlePlaylist.scss';
import { Sidebar, VideoCard } from '../../../components';
import { useVideo } from '../../../context';

import { useParams } from 'react-router-dom';
const SinglePlaylist = () => {
  const { playlistId } = useParams();

  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  const [videosInPlaylist, setVideosInPlaylist] = useState([]);
  useEffect(() => {
    const playlist = videoState.playlists.find(
      (playlist) => playlist._id === playlistId
    );
    if (playlist) {
      setVideosInPlaylist([...playlist?.videos]);
      let isAvailable = playlist.videos.length > 0 ? false : true;
      setIsEmpty(isAvailable);
    }
  }, [videoState]);
  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <p className='text-xxl text-centered mt-5'>
              No Videos In This Playlist. Add Now!
            </p>
          )}
          <div className='video-container'>
            {videosInPlaylist.map((video) => (
              <VideoCard video={video} fromPlaylist playlistId={playlistId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { SinglePlaylist };
