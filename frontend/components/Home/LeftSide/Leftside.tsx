'use client';

import { useEffect, useState } from "react";
import "./leftside.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { getProfileThunk } from "@/redux/features/profile/profileSlice";

const ProfileSidebar = () => {
  const [experience, setExperience] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.currentUser);
  const id = currentUser?.id;
  const currentProfile = useAppSelector(state => state.profile.currentProfile);
  useEffect(() => {
    if (currentUser) {
      dispatch(getProfileThunk(id));
    }
  }, [id])
  return (
    <div className="sidebar">

      <div className="pro-card" onClick={() => router.push('/profile')}>

        <div className="pro-cover"></div>

        <div className="pro-info">
          <div className="pro-avatar"><img src={currentProfile?.profilePicture} alt="" /></div>

          <h3 className="pro-name">
            {currentProfile?.firstName} {currentProfile?.lastName}
          </h3>

          <p className="pro-location">
            {currentProfile?.location}
          </p>

          {/* <button className="experience-btn" onClick={setExperience(true)}> 
             + Experience
          </button> */}
        </div>
      </div>

      <div className="connections-card">


        <div className="connections-top">
          <h4>Connections</h4>
          <span className="icon">👥</span>
        </div>

        <p className="connections-text">
          Grow your network
        </p>

      </div>

      <div className="premium-card">
        <p className="premium-text">
          Get 14x more connections on average with Premium
        </p>

        <button className="premium-btn">
          Claim 1 month of Premium for ₹0
        </button>
      </div>

      <div className="links-card">

        <div className="link-item">🔖 Saved items</div>
        <div className="link-item">👥 Groups</div>
        <div className="link-item">📰 Newsletters</div>
        <div className="link-item">📅 Events</div>

      </div>

    </div>
  );
};

export default ProfileSidebar;