'use client';
import React, { useEffect, useState } from 'react';
import './skills.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { getSkillsThunk } from '@/redux/features/profile/profileSlice';

const Skills = () => {
    const currentUser = useAppSelector(state => state.users.currentUser);
    const userId = currentUser?.id;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const currentSkills = [];
    //   const currentSkills = useAppSelector(
    //     state => state.profile.currentSkills
    //   );

    useEffect(() => {
        if (userId) {
            //   dispatch(getSkillsThunk(userId));
        }
    }, [userId, dispatch]);

    return (
        <div className="header">
            <div className="inner-header">

                <div className='heading'>
                    <span>Skills</span>
                    <span style={{fontSize:'15px', cursor:'pointer'}} onClick={()=>setIsOpen(true)}>➕</span>
                </div>

                <div className={`skills-container `}>
                    {/* {currentSkills?.length > 0 ? (
                        currentSkills.map((skill: any, index: number) => (
                            <div className="skill-chip" key={index}>
                                {skill.name || skill}
                            </div>
                        ))
                    ) : (
                        <p className="no-skills">No skills added yet</p>
                    )} */}
                </div>

            </div>
        </div>
    );
};

export default Skills;