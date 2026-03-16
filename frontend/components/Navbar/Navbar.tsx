'use client';

import React, { useState } from "react";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/users/userSlice";

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

export default function Navbar() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLDivElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    dispatch(logout());
    router.push("/home");
  };

  return (
    <AppBar position="sticky" elevation={0} className="li-navbar">

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
                <Avatar sx={{ width: 28, height: 28, backgroundColor:'#0a66c2'}} src={currentUser?.profilePicture}/>
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

                <div className="li-menu-header">

                  <Avatar className="li-menu-avatar" src={currentUser?.profilePicture} />

                  <div>
                    <Typography className="li-menu-name">
                      {currentUser?.firstName || "User"}
                    </Typography>

                    <Typography className="li-menu-headline">
                      Welcome back
                    </Typography>
                  </div>

                </div>

                <div className="li-view-profile-wrapper">
                  <Button
                    fullWidth
                    variant="outlined"
                    className="li-view-profile"
                    onClick={() => router.push("/profile")}
                  >
                    View profile
                  </Button>
                </div>

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