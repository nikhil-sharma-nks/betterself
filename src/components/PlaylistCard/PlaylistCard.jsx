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
      } else {
        showErrorMessage();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const showErrorMessage = () => {
    makeToast(`Action Failed, See Log For It's Reason`, 'error');
    console.log(
      "This function was failed because, you might have refreshed the page somewhere, since this is a frontend application which doesn't have the real backend, it uses mock backend mockbee and mirajeJs which on reloading srves entire mock backend again instead of persisting. So you might want to logout, reload and log in again with test credentials or signup again and use the features of this app without reloading"
    );
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
