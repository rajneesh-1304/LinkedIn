'use client'
import React, { useEffect, useState } from "react";
import "./image.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Modal } from '../../Profile_Components/Modal/Modal'
import { getProfileThunk } from "@/redux/features/profile/profileSlice";
import { Avatar } from "@mui/material";

const Image = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const profile = useAppSelector((state)=> state.profile.currentProfile);
    const currentUser = useAppSelector((state) => state.users.currentUser);
    const id = currentUser?.id;

    useEffect(()=>{
        if(id){
            dispatch(getProfileThunk(id));
        }
    },[id]);

    return (
        <div className="header">
            <div className="cover-photo">
                <img
                    src={
                        profile?.backgroundImage ||
                        "https://images.unsplash.com/photo-1503264116251-35a269479413"
                    }
                    alt="cover"
                    className='cover'
                />
            </div>

            <div className="profile-section">

                <div className="profile-image">
                    <Avatar className="prof-image"  src={profile?.profilePicture} />
                </div>

                <div className="profile-info">
                    <h1 className="name">
                        {profile?.firstName} {profile?.lastName}
                    </h1>

                    <p className="headline">{profile?.headline}</p>

                    <p className="location">{profile?.location}</p>

                    <div className="buttons">
                        <button className="primary-btn">Open to</button>
                        <button className="secondary-btn" onClick={() => setIsOpen(true)}>
                            Add profile section
                        </button>
                        <button className="secondary-btn">Enhance profile</button>
                    </div>
                </div>
            </div>

            {isOpen && <Modal close={() => setIsOpen(false)} />}
        </div>
    );
};

export default Image;