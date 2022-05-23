import React, { useState } from 'react';
import './videoCard.scss';

const VideoCard = ({ video }) => {
  const { id, title, description, creator, category, uploadDate, views } =
    video;
  const [menuModal, setMenuModal] = useState(false);
  const toggleMenuModal = () => setMenuModal((menu) => !menu);

  return (
    <div className='video-card'>
      <div className='thmubnail'>
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          className='thumbnail-img'
          alt={title}
        />
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
