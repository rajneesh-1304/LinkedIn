'use client';
import React from 'react';
import './userprofile.css';

const UserProfile = ({ id }: { id: any }) => {
  console.log('hi i am id', id);

  return <div>hi i am user profile {id}</div>;
};

export default UserProfile;