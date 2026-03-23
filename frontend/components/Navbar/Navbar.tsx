'use client';

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, logoutThunk } from "@/redux/features/users/userSlice";

import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Button,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getProfileThunk } from "@/redux/features/profile/profileSlice";

export default function Navbar() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userId = currentUser?.id;
  const currentProfile = useAppSelector(state => state.profile.currentProfile);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLDivElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
    router.push("/");
  };

  useEffect(() => {
    if (userId) {
      dispatch(getProfileThunk(userId));
    }
  }, [userId]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="li-navbar"
      sx={{ top: 0, zIndex: (theme) => theme.zIndex.appBar }}
    >

      <Toolbar className="li-toolbar">

        <Box className="li-left">

          <div
            className="li-logo"
            onClick={() => router.push("/home")}
          >
            in
          </div>

          <div className="li-search">
            <SearchIcon className="li-search-icon" />
            <InputBase placeholder="Search" className="li-search-input" />
          </div>

        </Box>

        <Box className="li-right">

          <div className="li-nav-item" onClick={() => router.push("/home")}>
            <IconButton size="small">
              <HomeIcon />
            </IconButton>
            <span>Home</span>
          </div>

          <div className="li-nav-item" onClick={() => router.push("/network")}>
            <IconButton size="small">
              <GroupIcon />
            </IconButton>
            <span>Network</span>
          </div>

          <div className="li-nav-item" onClick={() => router.push("/jobs")}>
            <IconButton size="small">
              <WorkIcon />
            </IconButton>
            <span>Jobs</span>
          </div>

          <div className="li-nav-item" onClick={() => router.push("/messaging")}>
            <IconButton size="small">
              <ChatIcon />
            </IconButton>
            <span>Messaging</span>
          </div>

          <div className="li-nav-item" onClick={() => router.push("/notifications")}>
            <IconButton size="small">
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <span>Notifications</span>
          </div>

          {!currentUser && (
            <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              <Button variant="outlined" onClick={() => router.push("/login")}>
                Sign in
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#0a66c2" }}
                onClick={() => router.push("/register")}
              >
                Join now
              </Button>
            </Box>
          )}

          {currentUser && (
            <>
              <Divider orientation="vertical" flexItem />

              <div className="li-profile" onClick={handleOpen}>
                <Avatar sx={{ width: 28, height: 28, backgroundColor: '#0a66c2' }} src={currentProfile?.profilePicture} />
                <ArrowDropDownIcon
                  sx={{ fontSize: 20, color: "#666", ml: "2px" }}
                />
              </div>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ className: "li-profile-menu" }}
              >
                {/* Header */}
                <div className="li-menu-header">
                  <Avatar
                    className="li-menu-avatar"
                    src={currentProfile?.profilePicture}
                  />
                  <div>
                    <Typography className="li-menu-name">
                      {currentProfile?.firstName || "User"}
                    </Typography>
                    <Typography className="li-menu-headline">
                      --
                    </Typography>
                  </div>
                </div>

                {/* View Profile */}
                <div className="li-view-profile-wrapper">
                  <Button
                    fullWidth
                    variant="outlined"
                    className="li-view-profile"
                    onClick={() => router.push(`/profile/${userId}`)}
                  >
                    View profile
                  </Button>
                </div>

                <Divider />

                {/* Account Section */}
                <Typography className="li-menu-section">Account</Typography>

                <MenuItem>Try 1 month of Premium for ₹0</MenuItem>
                <MenuItem>Settings & Privacy</MenuItem>
                <MenuItem>Help</MenuItem>
                <MenuItem>Language</MenuItem>

                <Divider />

                {/* Manage Section */}
                <Typography className="li-menu-section">Manage</Typography>

                <MenuItem>Posts & Activity</MenuItem>
                <MenuItem>Job Posting Account</MenuItem>

                <Divider />

                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Sign out
                </MenuItem>
              </Menu>
            </>
          )}

        </Box>

      </Toolbar>

    </AppBar>
  );
}