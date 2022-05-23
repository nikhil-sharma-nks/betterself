import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages';
import Mockman from 'mockman-js';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/mock' element={<Mockman />} />
    </Routes>
  );
};

export default RoutesContainer;
