"use client";

import "./notification.css";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import LeftSidebar from "../../components/Home/LeftSide/Leftside";
import RightSidebar from "@/components/Home/RightSide/Rightside";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getNotificationThunk } from "@/redux/features/notifications/notificationSlice";


interface Notification {
  id: string;
  message: string;
  createdAt: string;
  sender?: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

export default function Notifications() {

  const [filter, setFilter] = useState("all");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.currentUser);
  const userId =currentUser?.id;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const noti = useAppSelector(state => state.notifications.notifications);
  useEffect(()=>{
    dispatch(getNotificationThunk({userId}));
  },[]);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  return (
    <Box className="notification-page">

      <Navbar />

      <Box className="notification-body">

        <LeftSidebar />

        <Box className="notification-main">

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              backgroundColor: "white",
              mb: 2,
            }}
          >

            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleChange}
              sx={{
                gap: 1,
                flexWrap: "wrap",
              }}
            >

              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="jobs">Jobs</ToggleButton>
              <ToggleButton value="posts">My posts</ToggleButton>
              <ToggleButton value="mentions">Mentions</ToggleButton>

            </ToggleButtonGroup>

          </Paper>

          {noti.length === 0 ? (

            <Paper
              sx={{
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography>No notifications yet</Typography>
            </Paper>

          ) : (

            noti.map((notification) => (

              <Paper
                key={notification.id}
                sx={{
                  p: 2,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >

                <Avatar
                  src={notification.senderImage}
                />

                <Box>

                  <Typography>

                    <strong>
                    </strong>{" "}
                    {notification.message}

                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    {new Date(notification.createdAt).toLocaleString()}
                  </Typography>

                </Box>

              </Paper>

            ))

          )}

        </Box>

        <RightSidebar/>

      </Box>

    </Box>
  );
}