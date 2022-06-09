import React, { useState, useEffect } from 'react';
import './videoCard.scss';
import { isVideosInLiked, findVideoInWatchlater } from '../../../utils';
import { useVideo, useAuth } from '../../../context';
import { makeToast, PlaylistModal, Spinner } from '../../';
import { useNavigate } from 'react-router-dom';
import {
  addToLikedVideos,
  deleteFromLikedVideos,
  deleteVideoFromPlaylist,
  addVideoToWatchlater,
  deleteVideoFromWatchlater,
  deleteFromHistory,
} from '../../../api';

const VideoCard = ({ video, fromPlaylist, playlistId, fromHistory }) => {
  const navigate = useNavigate();
  const { _id, title, creator, uploadDate, views } = video;
  const { videoState, videoDispatch } = useVideo();
  const { authState } = useAuth();
  const [menuModal, setMenuModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMenuModal = () => setMenuModal((menu) => !menu);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isVideoInWatchlater, setIsVideoInWatchlater] = useState(false);

  useEffect(() => {
    setIsLiked(isVideosInLiked(_id, videoState?.likes));
    setIsVideoInWatchlater(findVideoInWatchlater(videoState.watchlater, _id));
  }, [videoState]);

  const handlePlaylistClick = () => {
    setIsPlaylistModalOpen(true);
  };

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
        setMenuModal(false);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleWatchlater = async () => {
    if (!authState.isAuth) {
      makeToast('Please Login First To Add To Watch later', 'error');
      navigate('/login');
      return;
    }
    if (isVideoInWatchlater) {
      try {
        setLoading(true);
        const data = await deleteVideoFromWatchlater(_id);
        if (data) {
          videoDispatch({
            type: 'ADD_TO_WATCH_LATER',
            payload: data,
          });
          makeToast(`${title} Removed From Watch Later`, 'success');
        }
        toggleMenuModal();
        setLoading(false);
      } catch (error) {
        makeToast('Failed To Removed From Watch Later', 'error');
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const data = await addVideoToWatchlater(video);
        if (data) {
          videoDispatch({
            type: 'ADD_TO_WATCH_LATER',
            payload: data,
          });
          makeToast(`${title} Added to watch later`, 'success');
        }
        toggleMenuModal();
        setLoading(false);
      } catch (error) {
        makeToast('Failed To Add To watch later', 'error');
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleHistory = async () => {
    try {
      setLoading(true);
      const history = await deleteFromHistory(_id);
      if (history) {
        videoDispatch({
          type: 'ADD_TO_HISTORY',
          payload: history,
        });
        makeToast(`${title} Removed From History`, 'success');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err.message);
    }
  };

  const handleCardClick = () => navigate(`/video/${_id}`);

  return (
    <>
      {isPlaylistModalOpen && (
        <PlaylistModal
          setIsPlaylistModalOpen={setIsPlaylistModalOpen}
          video={video}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className='video-card pos-rel'>
          <div className='thumbnail'>
            <img
              src={`https://img.youtube.com/vi/${_id}/maxresdefault.jpg`}
              className='thumbnail-img'
              alt={title}
              onClick={handleCardClick}
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
                    {fromPlaylist ? (
                      <div
                        className='menu-option cancel-option'
                        onClick={() => removeVideoFromPlaylist(playlistId, _id)}
                      >
                        Remove From Playlist
                      </div>
                    ) : (
                      <div
                        className='menu-option'
                        onClick={handlePlaylistClick}
                      >
                        Add To Playlist
                      </div>
                    )}
                    {isVideoInWatchlater ? (
                      <div
                        className='menu-option cancel-option'
                        onClick={handleWatchlater}
                      >
                        Remove From Watch Later
                      </div>
                    ) : (
                      <div onClick={handleWatchlater} className='menu-option'>
                        Add To Watch Later
                      </div>
                    )}
                    {fromHistory && (
                      <div
                        onClick={handleHistory}
                        className='menu-option cancel-option'
                      >
                        Remove From History
                      </div>
                    )}
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
      )}
    </>
  );
};

export { VideoCard };
