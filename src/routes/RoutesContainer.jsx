import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Likes, Playlist, SinglePlaylist } from '../pages';
import AuthenticatedRoutes from './AuthenticatedRoutes';

import Mockman from 'mockman-js';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/mock' element={<Mockman />} />
      <Route path='/' element={<AuthenticatedRoutes />}>
        <Route path='/likes' element={<Likes />} />
        <Route path='/playlists' element={<Playlist />} />
        <Route path='/playlists/:playlistId' element={<SinglePlaylist />} />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;
