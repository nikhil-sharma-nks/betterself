import React, { useState, useEffect } from 'react';
import './playlistModal.scss';
import {
  createPlaylist,
  addVideoInPlaylist,
  deleteVideoFromPlaylist,
} from '../../api';
import { useVideo, useAuth } from '../../context';
import { isVideoInPlaylist } from '../../utils';
import { makeToast, Spinner } from '../';
import { useNavigate } from 'react-router-dom';

const PlaylistModal = ({ setIsPlaylistModalOpen, video, fromPlaylist }) => {
  const navigate = useNavigate();

  const [playListName, setPlaylistName] = useState('');
  const [loading, setLoading] = useState(false);

  const { videoState, videoDispatch } = useVideo();
  const { authState } = useAuth();

  const [playlistCollection, setPlaylistCollection] = useState([]);

  useEffect(() => {
    if (fromPlaylist) return;
    const playlistHash = videoState.playlists.map((playlist) => ({
      ...playlist,
      isChecked: isVideoInPlaylist(playlist, video._id),
    }));
    setPlaylistCollection(playlistHash);
  }, [videoState]);

  const handleCreatePlaylist = async () => {
    if (!authState.isAuth) {
      makeToast('Please Login First To Create A Playlist', 'info');
      navigate('/login');
    }
    try {
      setLoading(true);
      const data = await createPlaylist(playListName);
      if (data) {
        videoDispatch({
          type: 'ADD_TO_PLAYLISTS',
          payload: data,
        });
        makeToast(`New Playlist ${playListName} Created`, 'success');
        setPlaylistName('');
        if (fromPlaylist) {
          navigate('/playlists');
          setIsPlaylistModalOpen(false);
        }
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleAddToPlaylist = async (playlistId, title) => {
    try {
      setLoading(true);
      const data = await addVideoInPlaylist(playlistId, video);
      if (data) {
        videoDispatch({
          type: 'ADD_TO_PLAYLISTS',
          payload: videoState.playlists.map((playlist) =>
            playlist._id === data._id ? data : playlist
          ),
        });
        makeToast(
          `${video.title} Video Added To ${data.title} Playlist `,
          'success'
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const removeVideoFromPlaylist = async (playlistId, videoId) => {
    try {
      setLoading(true);
      const data = await deleteVideoFromPlaylist(playlistId, videoId);
      if (data) {
        videoDispatch({
          type: 'ADD_TO_PLAYLISTS',
          payload: videoState.playlists.map((playlist) =>
            playlist._id === data._id ? data : playlist
          ),
        });
        makeToast(
          `${video.title} Video Remved from ${data.title} Playlist `,
          'success'
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleChange = (_id, title, isChecked) => {
    if (fromPlaylist) return;

    if (!authState.isAuth) {
      makeToast('Please Login First To Add/Remove Video', 'info');
      navigate('/login');
    }
    if (isChecked) {
      handleAddToPlaylist(_id, title);
    } else {
      removeVideoFromPlaylist(_id, video._id);
    }
  };

  return (
    <>
      <div className='playlist-modal-backdrop'>
        <div className='playlist-modal'>
          <div className='modal-header mb-2 pb-2'>
            <div className='modal-title'>Add To Playlist</div>
            <div
              className='modal-close'
              onClick={() => setIsPlaylistModalOpen(false)}
            >
              <i class='fa-solid fa-xmark cancel-icon'></i>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className='modal-body'>
                {playlistCollection.length === 0 && !fromPlaylist ? (
                  <p className='text-centered my-4'>
                    No Playlist Exists, Create One!
                  </p>
                ) : (
                  playlistCollection.map((playlist) => {
                    const { title, isChecked, _id } = playlist;
                    return (
                      <div className='my-2' key={_id}>
                        <input
                          type='checkbox'
                          id={_id}
                          name={title}
                          checked={isChecked}
                          onChange={(e) =>
                            handleChange(_id, title, e.target.checked)
                          }
                        />
                        <label className='ml-1' htmlFor={_id}>
                          {title}
                        </label>
                      </div>
                    );
                  })
                )}
              </div>
              <div className='modal-footer mt-auto'>
                <input
                  type='text'
                  className='add-to-playlist-input'
                  placeholder='Create New Playlist'
                  value={playListName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <button
                  class='btn btn-primary-outlined btn-floating'
                  onClick={handleCreatePlaylist}
                >
                  <i class='fa-solid fa-plus'></i>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { PlaylistModal };
