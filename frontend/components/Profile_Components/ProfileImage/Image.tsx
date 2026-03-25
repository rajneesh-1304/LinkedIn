'use client'
import React, { useEffect, useState } from "react";
import "./image.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Modal } from '../../Profile_Components/Modal/Modal'
import { getProfileThunk } from "@/redux/features/profile/profileSlice";
import { Avatar } from "@mui/material";
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { addFollowingThunk, checkFollowingThunk, removeFollowingThunk } from "@/redux/features/following/followingSlice";
import { ThreeDots } from "./ThreeDots/ThreeDots";

const Image = ({ id }: { id: any }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useAppSelector((state) => state.users.currentUser);
    const userId = currentUser?.id;
    const [followed, setFollowed] = useState(false);
    const profile = useAppSelector((state) => state.profile.currentProfile);
    const [menuOpen, setMenuOpen] = useState(false);

    const checkFollowStatus = async () => {
        if (!userId || !id) return;

        try {
            const res = await dispatch(
                checkFollowingThunk({ id: userId, userId: id })
            );
            setFollowed(res?.payload);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        checkFollowStatus();
    }, [userId, id]);

    const handleFollowToggle = async () => {
        if (!id || !userId) return;

        try {
            if (followed) {
                await dispatch(
                    removeFollowingThunk({ id: userId, userId: id })
                ).unwrap();

                setFollowed(false);
            } else {
                await dispatch(
                    addFollowingThunk({ id: userId, userId: id })
                ).unwrap();

                setFollowed(true);
            }

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(getProfileThunk(id));
        }
    }, [id]);

    return (
        <div className="header">
            <div className="cover-photo">
                {profile?.backgroundImage ?
                    <img
                        src={
                            profile?.backgroundImage ||
                            "https://images.unsplash.com/photo-1503264116251-35a269479413"
                        }
                        alt="cover"
                        className='cover'
                    /> : <></>

                }
            </div>

            <div className="profile-section">

                <div className="profile-image">
                    <Avatar className="prof-image" src={profile?.profilePicture} />
                </div>

                <div className="profile-info">
                    <h1 className="name">
                        {profile?.firstName} {profile?.lastName}
                    </h1>

                    <p className="headline">{profile?.headline}</p>

                    <p className="location">{profile?.location}</p>

                    {id === userId ?
                        <div className="buttons">
                            <button className="primary-btn">Open to</button>
                            <button className="secondary-btn" onClick={() => setIsOpen(true)}>
                                Add profile section
                            </button>
                            <button className="secondary-btn">Enhance profile</button>
                        </div> :
                        <>
                            <div style={{ fontSize: '12px', marginTop: '3px' }}>{profile?.totalConnections} <span style={{ color: 'gray' }}>connections</span></div>
                            <div className="buttons">
                                <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "5px" }}><IoIosSend /> Message</button>
                                <button className="secondary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "5px" }} onClick={handleFollowToggle}>
                                    <FaPlus />  {followed ? "Following" : "Follow"}
                                </button>
                                <div className="three-dot-wrapper">
                                    <button
                                        className="secondary-btn"
                                        onClick={() => setMenuOpen((prev) => !prev)}
                                    >
                                        More
                                    </button>

                                    {menuOpen && <ThreeDots id={id} userId={userId} close={() => setMenuOpen(false)} />}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

            {isOpen && <Modal close={() => setIsOpen(false)} />}
        </div>
    );
};

export default Image;