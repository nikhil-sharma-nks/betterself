import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useVideo, useTheme } from '../../context';
import './navbar.scss';
// import { makeToast } from '../../components';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoState, videoDispatch } = useVideo();
  const { theme, toggleTheme } = useTheme();
  const authState = { isAuth: false, token: '', user: {} };
  // const { authState, authDispatch } = useAuth();
  const { searchQuery } = videoState;
  // const handleLogout = () => {
  //   makeToast('You Are Now Logged Out', 'success');
  //   authDispatch({
  //     type: 'LOGOUT',
  //   });
  //   productDispatch({ type: 'LOGOUT' });
  //   navigate('/');
  // };
  const handleFocus = () => {
    // if (location.pathname === '/') {
    //   navigate('/');
    // }
  };
  const handleChange = (e) => {
    videoDispatch({
      type: 'SEARCH_QUERY',
      payload: e.target.value,
    });
  };
  return (
    <div className='navigationbar-container'>
      <div className='navbar'>
        <Link to='/'>
          <div className='navbar-header'>
            <div className='h2'>BetterSelf</div>
          </div>
        </Link>
        <div className='navbar-search'>
          <i className='fa-solid fa-magnifying-glass'></i>
          <input
            type='text'
            className='form-control'
            placeholder='Search Products Here'
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <i
            className='fa-solid fa-xmark search-cancel'
            onClick={() =>
              videoDispatch({
                type: 'SEARCH_QUERY',
                payload: '',
              })
            }
          ></i>
        </div>
        <div className='navigation-buttons'>
          <div className='theme-container' onClick={toggleTheme}>
            {theme === 'light' ? (
              <i className='fa-regular fa-moon'></i>
            ) : (
              <i className='fa-solid fa-sun'></i>
            )}
          </div>
          {authState.isAuth && authState.token ? (
            <div className='dropdown'>
              <div className='avatar-text avatar-circular avatar-small'>
                {authState.user.firstName.charAt(0).toUpperCase() +
                  authState.user.lastName.charAt(0).toUpperCase()}
              </div>
              <div className='dropdown-content'>
                <div>Profile</div>
                <div>Logout</div>
              </div>
            </div>
          ) : (
            <Link to='/login'>
              <button className='btn btn-secondary-outlined'>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export { Navbar };
