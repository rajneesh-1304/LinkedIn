'use client';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import './experience.css';
import { getExperienceThunk } from '@/redux/features/profile/profileSlice';

const Experience = () => {
  const currentUser = useAppSelector(state => state.users.currentUser);
    const userId = currentUser?.id;
  
    const dispatch = useAppDispatch();
  
    const currentExperience = useAppSelector(
      state => state.profile.currentExperience
    );
  
    useEffect(() => {
      if (userId) {
        dispatch(getExperienceThunk(userId));
      }
    }, [userId, dispatch]);
  return (
    <div className="header">
      <div className="inner-header">

        <div className='heading'>Experience</div>

        {currentExperience?.length > 0 && currentExperience.map((exp: any, index: number) => (
          <div className='box' key={index}>

            <div className='image'>
              <img
                src="https://www.ccet.ac.in/assets/ccetLogo-D99RbQYi.png"
                alt="college"
              />
            </div>

            <div className='college'>
              <h1 className='college-name'>{exp.compnay}</h1>

              <h2 className='college-degree'>{exp.position}</h2>

              <h3 className='college-timing'>
                {exp.startDate} – {exp.endDate}
              </h3>

              <h3 className='college-grade'>
                Location: {exp.location}
              </h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Experience
