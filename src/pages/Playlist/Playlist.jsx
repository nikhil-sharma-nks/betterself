import React, { useEffect, useState } from 'react';
import './playlist.scss';

import { Sidebar, PlaylistCard, PlaylistModal } from '../../components';
import { useVideo } from '../../context';
import { totalVideosInPlaylists } from '../../utils';

const Playlist = () => {
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const { videoState } = useVideo();
  const [isEmpty, setIsEmpty] = useState(false);
  const handleCreatePlaylist = () => {
    setIsPlaylistModalOpen(true);
  };
  useEffect(() => {
    let isAvailable = videoState.playlists.length > 0 ? false : true;
    setIsEmpty(isAvailable);
    totalVideosInPlaylists(videoState.playlists);
  }, [videoState]);
  return (
    <>
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page playlist-page'>
          {isPlaylistModalOpen && (
            <PlaylistModal
              setIsPlaylistModalOpen={setIsPlaylistModalOpen}
              fromPlaylist
            />
          )}
          <div className='header-bar '>
            <div className='total-video-count'>
              {videoState.playlists.length} Playlists |{' '}
              {totalVideosInPlaylists(videoState.playlists)} Videos
            </div>
            <button
              class='btn btn-primary-outlined'
              onClick={handleCreatePlaylist}
            >
              Create Playlist
            </button>
          </div>
          {isEmpty && (
            <p className='text-xxl text-centered mt-5'>
              No Playlist Available, Create one
            </p>
          )}

          <div className='video-container'>
            {videoState.playlists.map((playlist) => (
              <PlaylistCard playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export { Playlist };
