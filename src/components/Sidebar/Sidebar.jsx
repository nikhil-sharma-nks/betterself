import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context';

const Sidebar = ({ handleLogout, toggleMenuClick }) => {
  const { authState, authDispatch } = useAuth();
  const sidebarLinks = [
    {
      name: 'Home',
      link: '/home',
      icon: <i className='fa-solid fa-house mr-3'></i>,
    },
    {
      name: 'Playlist',
      link: '/playlists',
      icon: <i className='fa-solid fa-play mr-3'></i>,
    },
    {
      name: 'Liked',
      link: '/likes',
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
        <li className='show-in-mobile'>
          {!authState.isAuth ? (
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? 'link-item link-isActive' : 'link-item'
              }
            >
              <i className='fa-solid fa-arrow-right-to-bracket mr-3'></i>
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to='/profile'
                className={({ isActive }) =>
                  isActive ? 'link-item link-isActive' : 'link-item'
                }
              >
                <i className='fa-solid fa-arrow-right-to-bracket mr-3'></i>
                Profile
              </NavLink>
              <div
                className='link-item'
                onClick={() => {
                  handleLogout();
                  toggleMenuClick();
                }}
              >
                <i className='fa-solid fa-arrow-right-to-bracket mr-3'></i>
                Logout{' '}
              </div>
            </>
          )}

          <li
            className='link-item close-menu'
            onClick={() => toggleMenuClick()}
          >
            <i className='fa-solid fa-circle-xmark mr-3'></i>Close
          </li>
        </li>
      </ul>
    </div>
  );
};

export { Sidebar };
