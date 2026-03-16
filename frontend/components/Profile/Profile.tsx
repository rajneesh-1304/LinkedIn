import React from 'react'
import Navbar from '../Navbar/Navbar'
import Image from '../Profile_Components/ProfileImage/Image'
import Education from '../Profile_Components/Education/Education'
import Experience from '../Profile_Components/Experience/Experience'
import './profile.css'

const Profile = () => {
  return (
    <div>
        <Navbar/>

        <div className='profile'>
            <div className='inner-profile'>
                <div><Image/></div>
                <div><Education/></div>
                <div><Experience/></div>
            </div>
        </div>
    </div>
  )
}

export default Profile
