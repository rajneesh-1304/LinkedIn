import React from 'react'
import Navbar from '../Navbar/Navbar'
import Image from '../Profile_Components/ProfileImage/Image'
import Education from '../Profile_Components/Education/Education'
import Experience from '../Profile_Components/Experience/Experience'
import './profile.css'
import Skills from '../Profile_Components/Skills/Skills'

const Profile = ({id}: {id: any}) => {
  console.log('hello id', id);
  return (
    <div>
        <Navbar/>

        <div className='profile'>
            <div className='inner-profile'>
                <div><Image id={id}/></div>
                <div><Education id={id}/></div>
                <div><Experience id={id}/></div>
                <div><Skills id={id}/></div>
            </div>
        </div>
    </div>
  )
}

export default Profile
