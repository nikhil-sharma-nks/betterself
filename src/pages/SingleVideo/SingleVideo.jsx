import './singleVideo.scss';
import React, { useState, useEffect } from 'react';
import { Sidebar, Spinner, makeToast, PlaylistModal } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllVideos } from '../../api';
import { isVideosInLiked, findVideoInWatchlater } from '../../utils';
import { useVideo, useAuth } from '../../context';

import {
  addToLikedVideos,
  deleteFromLikedVideos,
  addVideoToWatchlater,
  deleteVideoFromWatchlater,
  addToHistory,
} from '../../api';

const SingleVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { videoState, videoDispatch } = useVideo();
  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [video, setVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVideoInWatchlater, setIsVideoInWatchlater] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const videos = await getAllVideos();
        videoDispatch({
          type: 'LOAD_VIDEOS',
          payload: videos,
        });

        const foundVideo = videos.find((video) => video._id === videoId);
        foundVideo ? setIsFound(true) : setIsFound(false);
        if (foundVideo) {
          setVideo(foundVideo);
          const history = await addToHistory(foundVideo);
          if (history) {
            videoDispatch({
              type: 'ADD_TO_HISTORY',
              payload: history,
            });
          }
        }
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  useEffect(() => {
    if (isFound) {
      setIsLiked(isVideosInLiked(video._id, videoState?.likes));
      setIsVideoInWatchlater(
        findVideoInWatchlater(videoState.watchlater, video._id)
      );
    }
  }, [videoState]);

  const handleLiked = async () => {
    if (!authState.isAuth) {
      makeToast('Please Login First To Add To Liked', 'error');
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
          makeToast(`${video.title} Added to Liked Videos`, 'success');
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
        makeToast(`${video.title} Removed from Liked Videos`, 'success');
      } catch (error) {
        makeToast('Failed Removed from Liked Videos', 'error');
        console.log(error);
      }
    }
  };

  const handleWatchlater = async () => {
    if (!authState.isAuth) {
      makeToast('Please Login First To Add To Watch Later', 'error');
      navigate('/login');
      return;
    }
    if (isVideoInWatchlater) {
      try {
        const data = await deleteVideoFromWatchlater(video._id);
        if (data) {
          videoDispatch({
            type: 'ADD_TO_WATCH_LATER',
            payload: data,
          });
          makeToast(`${video.title} Removed From Watch Later`, 'success');
        }
      } catch (error) {
        makeToast('Failed To Removed From Watch Later', 'error');
        console.log(error);
      }
    } else {
      try {
        const data = await addVideoToWatchlater(video);
        if (data) {
          videoDispatch({
            type: 'ADD_TO_WATCH_LATER',
            payload: data,
          });
          makeToast(`${video.title} Added to watch later`, 'success');
        }
      } catch (error) {
        makeToast('Failed To Add To watch later', 'error');
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handlePlaylistClick = () => {
    setIsPlaylistModalOpen(true);
  };

  return (
    <>
      {isPlaylistModalOpen && (
        <PlaylistModal
          setIsPlaylistModalOpen={setIsPlaylistModalOpen}
          video={video}
        />
      )}
      <div className='app-body'>
        <Sidebar />
        <div className='main-body home-page single-video-page'>
          {loading ? (
            <Spinner />
          ) : (
            <div className='single-video-content-container'>
              <div className='single-video-container'>
                {video ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video._id}`}
                    className='video'
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                  ></iframe>
                ) : (
                  ''
                )}
                <div className='video-info'>
                  <div className='video-title'>{video.title}</div>
                  <div className='video-creator'>{video.creator}</div>
                  <div className='stats-options'>
                    <div className='stats'>
                      {video.views} Views {' | '}
                      {video.likes} Likes {' | '}
                      {video.uploadDate}
                    </div>
                    <div className='options'>
                      <div
                        className='like-btn option-btn '
                        onClick={handleLiked}
                      >
                        {isLiked ? (
                          <div className='liked-btn'>
                            <i className='fa-solid fa-thumbs-up mr-2 '></i>
                            Liked
                          </div>
                        ) : (
                          <div>
                            <i className='fa-regular fa-thumbs-up mr-2'></i>
                            Like
                          </div>
                        )}
                      </div>
                      <div
                        className='watch-later-btn option-btn'
                        onClick={handleWatchlater}
                      >
                        {isVideoInWatchlater ? (
                          <div className='remove-watch-later'>
                            <i className='fa-solid fa-clock mr-2'></i>Remove
                            From Watch Later
                          </div>
                        ) : (
                          <div>
                            <i className='fa-regular fa-clock mr-2'></i>Add To
                            Watch Later
                          </div>
                        )}
                      </div>
                      <div
                        className='playlist-btn option-btn'
                        onClick={handlePlaylistClick}
                      >
                        <div>
                          <i class='fa-solid fa-square-plus mr-2'></i>Save
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='description my-2'>{video.description}</div>
                </div>
              </div>
            </div>
          )}
          {!isFound && !loading && (
            <p className='text-xxl text-centered'>Video Not Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export { SingleVideo };
