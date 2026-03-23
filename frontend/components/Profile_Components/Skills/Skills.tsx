'use client';
import React, { useEffect, useState } from 'react';
import './skills.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllSkillsThunk, getSkillsThunk } from '@/redux/features/profile/profileSlice';
import SkillModal from '../SkillsModal/SkillModal';
// import { getSkillsThunk } from '@/redux/features/profile/profileSlice';

const Skills = ({ id }: { id: any }) => {
    const currentUser = useAppSelector(state => state.users.currentUser);
    const userId = currentUser?.id;
    const [isOpen, setIsOpen] = useState(false);
    const skills = useAppSelector(state => state.profile.totalSkills);
    const dispatch = useAppDispatch();
    const currentSkills = useAppSelector(
        state => state.profile.currentSkills
    );

    useEffect(() => {
        if (id) {
            dispatch(getSkillsThunk(id));
            dispatch(getAllSkillsThunk());
        }
    }, [id, dispatch]);

    return (
        <div className="header">
            <div className="inner-header">

                <div className='heading'>
                    <span>Skills</span>
                    {id === userId ? <span style={{fontSize:'15px', cursor:'pointer'}} onClick={()=>setIsOpen(true)}>➕</span> : <></>}
                </div>

                <div className={`skills-container `}>
                    {currentSkills?.length > 0 ? 
                    (
                        currentSkills.map((skill: any, index: number) => (
                            <div className="skill-chip" key={index}>
                                {skill.skill}
                            </div>
                        ))
                    ) : (
                        <p className="no-skills">No skills added yet</p>
                    )}
                </div>

            </div>

            {isOpen && (<SkillModal close={()=> setIsOpen(false)}/>)}
        </div>
    );
};

export default Skills;