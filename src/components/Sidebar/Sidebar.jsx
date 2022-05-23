import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: 'Home',
      link: '/home',
      icon: <i className='fa-solid fa-house mr-3'></i>,
    },
    {
      name: 'Playlist',
      link: '/playlist',
      icon: <i className='fa-solid fa-play mr-3'></i>,
    },
    {
      name: 'Liked',
      link: '/liked-videos',
      icon: <i className='fa-solid fa-thumbs-up mr-3'></i>,
    },
    {
      name: 'Watch Later',
      link: '/watch-later',
      icon: <i className='fa-solid fa-clock mr-3'></i>,
    },
    {
      name: 'History',
      link: '/history',
      icon: <i className='fa-solid fa-clock-rotate-left mr-3'></i>,
    },
  ];
  return (
    <div className='sidebar'>
      <ul className='sidebar-link-container'>
        {sidebarLinks.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? 'link-item link-isActive' : 'link-item'
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Sidebar };
