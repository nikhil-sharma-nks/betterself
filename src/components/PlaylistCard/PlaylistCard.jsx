import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './playlistCard.scss';
import { deletePlaylist } from '../../api';
import { useVideo } from '../../context';
import { makeToast } from '../';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { videoDispatch } = useVideo();
  const handleDelete = async () => {
    try {
      const playlists = await deletePlaylist(playlist._id);
      if (playlists) {
        videoDispatch({
          type: 'ADD_TO_PLAYLISTS',
          payload: playlists,
        });
        makeToast(`${playlist.title} Deleted`, 'success');
        navigate('/playlists');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Link to={`/playlists/${playlist._id}`}>
        <div className='playlist-card'>
          <div className='playlist-title text-xl'>{playlist.title}</div>
          <div className='playlist-card-footer mt-auto'>
            <div>{playlist.videos.length} videos</div>
            <div onClick={handleDelete}>
              <i class='fa-solid fa-trash fa-2x delete-icon'></i>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export { PlaylistCard };
