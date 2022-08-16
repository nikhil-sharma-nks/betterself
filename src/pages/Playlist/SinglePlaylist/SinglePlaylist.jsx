import React, { useEffect, useState } from 'react';
import './singlePlaylist.scss';
import { Sidebar, VideoCard, Error, makeToast } from '../../../components';
import { useVideo } from '../../../context';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  const [videosInPlaylist, setVideosInPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('');
  useEffect(() => {
    const playlist = videoState.playlists.find(
      (playlist) => playlist._id === playlistId
    );
    if (playlist) {
      setVideosInPlaylist([...playlist?.videos]);
      let isAvailable = playlist.videos.length > 0 ? false : true;
      setIsEmpty(isAvailable);
      setPlaylistTitle(playlist.title);
    } else {
      makeToast('Playlist Not Found', 'error');
      navigate('/playlists');
    }
  }, [videoState]);
  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page '>
          {isEmpty && (
            <Error>
              <p className='text-xl'>
                {' '}
                No Videos In "{playlistTitle}" Playlist
              </p>
              <p className='text-m'>
                Videos that you have added in this playlist would appear here.
                Add now!
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
