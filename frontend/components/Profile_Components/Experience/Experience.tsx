'use client';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import './experience.css';
import { getExperienceThunk } from '@/redux/features/profile/profileSlice';
import ExperienceModal from '../ExperienceModal/ExperienceModal';

const Experience = ({ id }: { id: any }) => {
  const currentUser = useAppSelector(state => state.users.currentUser);
  const userId = currentUser?.id;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const currentExperience = useAppSelector(
    state => state.profile.currentExperience
  );

  useEffect(() => {
    if (id) {
      dispatch(getExperienceThunk(id));
    }
  }, [id, dispatch]);
  return (
    <div className="header">
      <div className="inner-header">

        <div className='heading'>
          <span>Experience</span>
          {id === userId ? <span style={{ fontSize: '15px', cursor: 'pointer' }} onClick={() => setIsOpen(true)}>➕</span> : <></>}
        </div>

        {currentExperience?.length > 0 ? (currentExperience.map((exp: any, index: number) => (
          <div className='box' key={index}>

            <div className='image'>
              <img
                src="https://www.ccet.ac.in/assets/ccetLogo-D99RbQYi.png"
                alt="college"
              />
            </div>

            <div className='college'>
              <h1 className='college-name'>{exp.company}</h1>

              <h2 className='college-degree'>{exp.position}</h2>

              <h3 className='college-timing'>
                {exp.startDate} – {exp.endDate}
              </h3>

              <h3 className='college-grade'>
                Location: {exp.location}
              </h3>
            </div>

          </div>
        ))) : (
          <p className="no-skills">No experience added yet</p>
        )}

      </div>
      {isOpen && (
        <ExperienceModal
          close={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default Experience
