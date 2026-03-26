'use client'
import ProfileSidebar from '@/components/Home/LeftSide/Leftside'
import Rightside from '@/components/Home/RightSide/Rightside'
import Navbar from '@/components/Navbar/Navbar'
import React, { useState } from 'react'
import './home.css'
import Createpost from '@/components/Home/Createpost/Createpost'

const Page = () => {

  return (
    <div className='home-container'>
      <Navbar />

      <div className='lmr'>
        <ProfileSidebar/>
        <Createpost />
        <Rightside />
      </div>

    </div>
  )
}

export default Page