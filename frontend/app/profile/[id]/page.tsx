'use client';
import React from 'react'
import './profile.css';
import Profile from '@/components/Profile/Profile';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <div className='profile-main'>
      <Profile id={id}/>
    </div>
  )
}

export default Page;