import React from 'react';
import './profile.scss';
import { useAuth } from '../../context';

const Profile = () => {
  const { authState } = useAuth();
  return (
    <div className='profile-page theme-background py-4'>
      <div className='user-info-container '>
        <div className='user-info-item'>
          <p>First Name</p>
          <p>{authState.user.firstName}</p>
        </div>
        <div className='user-info-item'>
          <p>Last Name</p>
          <p>{authState.user.lastName}</p>
        </div>
        <div className='user-info-item'>
          <p>Phone</p>
          <p>{authState.user.phoneNo}</p>
        </div>
        <div className='user-info-item'>
          <p>Email</p>
          <p>{authState.user.email}</p>
        </div>
        <div className='user-info-item'>
          <p>Account Created At</p>
          <p>{authState.user.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

export { Profile };
