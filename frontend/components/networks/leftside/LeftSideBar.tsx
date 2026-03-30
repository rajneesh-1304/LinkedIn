/* eslint-disable @next/next/no-img-element */
"use client";

import "./LeftSideBar.css";

import {
  Box,
  Paper,
  Typography,
  Stack,
  Button
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTotalConnectionThunk } from "@/redux/features/connection/connectionSlice";
import { GetTotalFollowingThunk } from "@/redux/features/following/followingSlice";

const NetworkLeftSidebar = () => {
  const currentUser= useAppSelector(state => state.users.currentUser);
  const id=currentUser?.id;
  const currentProfile = useAppSelector(state => state.profile.currentProfile);

  const dispatch = useAppDispatch();
  const totalFollowing = currentProfile?.totalFollowers || 0;
  const totalConnection = currentProfile?.totalConnections || 0;
  const totalInvitations = currentProfile?.totalInvitations || 0;
  console.log(currentProfile, 'current profile in left sidebar', totalConnection, totalFollowing, totalInvitations);

  useEffect(()=>{
    dispatch(getTotalConnectionThunk({id}));
    dispatch(GetTotalFollowingThunk({id}));
  },[])
  return (
    <Box className="network-left-container">

      <Paper elevation={1} className="network-card">

        <Typography className="card-title">
          Network overview
        </Typography>

        <Stack direction="row" justifyContent="space-between" className="stats-row">

          {[
            { value: totalInvitations, label: "Invites sent" },
            { value: totalConnection, label: "Connections" },
            { value: totalFollowing, label: "Following" }
          ].map((stat, i) => (
            <Box key={i} className="stat-item">
              <Typography className="stat-number">
                {stat.value}
              </Typography>
              <Typography className="stat-label">
                {stat.label}
              </Typography>
            </Box>
          ))}

        </Stack>

        <Stack direction="row" alignItems="center" className="show-more">
          <Typography>Show more</Typography>
          <KeyboardArrowDownIcon fontSize="small" />
        </Stack>

      </Paper>


      <Paper elevation={1} className="job-card">

        <Box className="job-header">
          <Typography className="linkedin-badge">
            LinkedIn
          </Typography>

          <Typography variant="subtitle1" className="job-title">
            Your job search powered by your network
          </Typography>

          <Button className="explore-btn">
            Explore jobs
          </Button>
        </Box>

        <img
          src="https://cdn.dribbble.com/userupload/19914420/file/original-fa73e948d55a3424ad17c41c939c4059.gif"
          alt="network jobs"
          className="job-image"
        />

      </Paper>


      <Box className="network-footer">

        <Stack className="footer-links">
          <span>About</span>
          <span>Accessibility</span>
          <span>Help Center</span>
          <span>Privacy & Terms</span>
          <span>Ad Choices</span>
          <span>Advertising</span>
          <span>Business Services</span>
          <span>Get the LinkedIn app</span>
          <span>More</span>
        </Stack>

        <Typography className="footer-copyright">
          <strong className="linkedin-text">LinkedIn</strong>
          <span> LinkedIn Corporation © 2026</span>
        </Typography>

      </Box>

    </Box>
  );
};

export default NetworkLeftSidebar;