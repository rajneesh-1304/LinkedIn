'use client'
import React, { useEffect, useState } from "react";
import "./image.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Modal } from '../../Profile_Components/Modal/Modal'
import { getProfileThunk } from "@/redux/features/profile/profileSlice";

const Image = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const profile = useAppSelector((state)=> state.profile.currentProfile);
    const currentUser = useAppSelector((state) => state.users.currentUser);
    const id=currentUser?.id;

    useEffect(()=>{
        if(currentUser){
            dispatch(getProfileThunk(id));
        }
    },[id])


    return (
        <div className="header">
            <div className="cover-photo"></div>

            <div className="profile-section">
                <div className="profile-image">
                    <img src={profile?.profilePicture} alt="" style={{objectFit: 'cover', overflow: 'hidden' }}/>
                </div>

                <div className="profile-info">
                    <h1 className="name">{profile?.firstName} {profile?.lastName}</h1>
                    <p className="headline">--</p>
                    <p className="location">{profile?.location}</p>

                    <div className="buttons">
                        <button className="primary-btn">Open to</button>
                        <button className="secondary-btn" onClick={() => setIsOpen(true)}>Add section</button>
                        <button className="secondary-btn">Enhance profile</button>
                    </div>
                </div>
            </div>

            {isOpen &&
                <Modal close={() => setIsOpen(false)}/>

            }
        </div>
    );
};

export default Image;