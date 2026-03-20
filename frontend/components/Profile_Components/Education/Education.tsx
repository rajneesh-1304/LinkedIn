'use client';
import React, { useEffect, useState } from 'react'
import './education.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getEducationThunk } from '@/redux/features/profile/profileSlice';
import EducationModal from '../EducationModal/EducationModal';

const Education = () => {

  const currentUser = useAppSelector(state => state.users.currentUser);
  const userId = currentUser?.id; 
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const currentEducation = useAppSelector(
    state => state.profile.currentEducation
  );

  useEffect(() => {
    if (userId) {
      dispatch(getEducationThunk(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="header">
      <div className="inner-header">

        <div className='heading'>
          <span>Education</span>
          <span style={{fontSize:'15px', cursor:'pointer'}} onClick={()=>setIsOpen(true)}>➕</span>
        </div>

        {currentEducation?.length > 0 && currentEducation.map((edu: any, index: number) => (
          <div className='box' key={index}>

            <div className='image'>
              <img
                src="https://www.ccet.ac.in/assets/ccetLogo-D99RbQYi.png"
                alt="college"
              />
            </div>

            <div className='college'>
              <h1 className='college-name'>{edu.instituteName}</h1>

              <h2 className='college-degree'>{edu.degreeName}</h2>

              <h3 className='college-timing'>
                {edu.startDate} – {edu.endDate}
              </h3>

              <h3 className='college-grade'>
                Grade: {edu.Grade}
              </h3>
            </div>

          </div>
        ))}

      </div>

      {isOpen && (
              <EducationModal
                close={() => setIsOpen(false)}
              />
            )}
    </div>
  )
}

export default Education;