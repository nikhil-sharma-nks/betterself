import React, { useState, useEffect } from 'react';
import './videoCard.scss';
import { isVideosInLiked } from '../../../utils';
import { useVideo, useAuth } from '../../../context';
import { makeToast } from '../../';
import { useNavigate } from 'react-router-dom';
import {
  getUserLikedVideos,
  addToLikedVideos,
  deleteFromLikedVideos,
} from '../../../api';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const { _id, title, description, creator, category, uploadDate, views } =
    video;
  const { videoState, videoDispatch } = useVideo();
  const { authState, authDispatch } = useAuth();
  const [menuModal, setMenuModal] = useState(false);
  const toggleMenuModal = () => setMenuModal((menu) => !menu);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(isVideosInLiked(_id, videoState?.likes));
  }, [videoState]);
  const handleLiked = async () => {
    if (!authState.isAuth) {
      makeToast('Please Login First To Add To Wishlist', 'error');
      navigate('/login');
      return;
    }
    if (!isLiked) {
      try {
        const data = await addToLikedVideos(video);
        if (data) {
          videoDispatch({
            type: 'ADD_TO_LIKED',
            payload: data,
          });
          makeToast(`${title} Added to Liked Videos`, 'success');
        }
      } catch (error) {
        makeToast('Failed To Add To Liked Videos', 'error');
        console.log(error);
      }
    } else {
      try {
        const data = await deleteFromLikedVideos(video._id);
        videoDispatch({
          type: 'ADD_TO_LIKED',
          payload: data,
        });
        makeToast(`${title} Removed from Liked Videos`, 'success');
      } catch (error) {
        makeToast('Failed Removed from Liked Videos', 'error');
        console.log(error);
      }
    }
  };

  return (
    <div className='video-card pos-rel'>
      <div className='thmubnail'>
        <img
          src={`https://img.youtube.com/vi/${_id}/maxresdefault.jpg`}
          className='thumbnail-img'
          alt={title}
        />
        <i
          className={
            isLiked
              ? 'fas fa-heart wishlist wishlist-selected'
              : 'fas fa-heart wishlist'
          }
          onClick={handleLiked}
        ></i>
      </div>
      <div className='info-container'>
        <div className='video-title-menu'>
          <div className='video-title'>{title}</div>
          <div className='video-menu'>
            <i
              className='fa-solid fa-ellipsis-vertical'
              onClick={toggleMenuModal}
            ></i>
            {menuModal && (
              <div className='menu-modal'>
                <div className='menu-option'>Add To Playlist</div>
                <div className='menu-option'>Add To Watch Later</div>
                <div className='menu-option'>Remove From Watch Later</div>
              </div>
            )}
          </div>
        </div>
        <div className='creator mt-2'>{creator}</div>
        <div className='video-details mt-2'>
          <div className='views-count'>{views} views</div>
          <div className='upload-date'>{uploadDate}</div>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
