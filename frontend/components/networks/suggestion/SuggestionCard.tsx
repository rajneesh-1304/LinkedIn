/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addConnectionThunk,
  checkConnectionThunk,
} from "@/redux/features/connection/connectionSlice";
import {
  addFollowingThunk,
  checkFollowingThunk,
  removeFollowingThunk,
} from "@/redux/features/following/followingSlice";

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  profilePicture?: string;
  followersCount?: number;
}

interface SuggestionCardProps {
  user: User;
  onRemove?: (id: string) => void;
}

export default function SuggestionCard({ user, onRemove }: SuggestionCardProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const [followed, setFollowed] = useState(false);
  const [requested, setRequested] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followersCount || 0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const currentUserId = currentUser?.id;
  const userId = user.id;

  const checkFollowStatus = async () => {
    if (!currentUserId || !userId) return;
    try {
      const res = await dispatch(checkFollowingThunk({ id: currentUserId, userId }));
      setFollowed(res?.payload);
    } catch (err) {
      console.error("Follow status error:", err);
    }
  };

  const checkConnectionStatus = async () => {
    if (!currentUserId || !userId) return;
    try {
      const res = await dispatch(checkConnectionThunk({ id: currentUserId, userId }));
      if (res?.payload === "PENDING") setRequested(true);
      else setRequested(false);
    } catch (err) {
      console.error("Connection status error:", err);
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUserId || !userId) return;

    try {
      if (followed) {
        await dispatch(removeFollowingThunk({ id: currentUserId, userId })).unwrap();
        setFollowed(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
        setSnackbarMessage("Unfollowed successfully");
        setSnackbarSeverity("success");
      } else {
        await dispatch(addFollowingThunk({ id: currentUserId, userId })).unwrap();
        setFollowed(true);
        setFollowersCount((prev) => prev + 1);
        setSnackbarMessage("Followed successfully");
        setSnackbarSeverity("success");
      }
      setSnackbarOpen(true);
    } catch (err) {
      setFollowed(false);
      console.error("Follow toggle error:", err);
      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleConnectToggle = async () => {
    if (!currentUserId || !userId) return;

    try {
      await dispatch(addConnectionThunk({ id: currentUserId, userId })).unwrap();
      setRequested(true);
      setSnackbarMessage("Connection request sent");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setRequested(false);
      console.error("Connection toggle error:", err);
      setSnackbarMessage("Failed to send request");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    checkFollowStatus();
    checkConnectionStatus();
  }, [currentUserId, userId]);

  return (
    <Paper elevation={1} className="suggestion-card">
      <Box
        className="cover-wrapper"
        style={{
          backgroundColor: "#1282f3",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80px",
          position: "relative",
        }}
      >
        <IconButton
          className="close-btn"
          size="small"
          onClick={() => onRemove?.(user.id)}
          sx={{ position: "absolute", top: 4, right: 4, color: "#fff" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className="avatar-wrapper" sx={{ display: "flex", justifyContent: "center", mt: -4 }}>
        <Avatar
          src={user.profilePicture}
          sx={{ width: 64, height: 64, border: "3px solid white" }}
        />
      </Box>

      <Box className="card-body" sx={{ p: 2, textAlign: "center" }}>
        <Typography fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>

        {user.headline && (
          <Typography fontSize={13} color="text.secondary" sx={{ mt: 0.5 }}>
            {user.headline}
          </Typography>
        )}

        <Button
          startIcon={!followed ? <AddIcon /> : undefined}
          variant={followed ? "contained" : "outlined"}
          fullWidth
          sx={{
            mt: 2,
            borderRadius: "999px",
            backgroundColor: followed ? "#1282f3" : "transparent",
            color: followed ? "#fff" : "#1282f3",
            textTransform: "none",
          }}
          onClick={handleFollowToggle}
        >
          {followed ? "Following" : "Follow"}
        </Button>

        <Button
          variant={requested ? "contained" : "outlined"}
          fullWidth
          sx={{
            mt: 1,
            borderRadius: "999px",
            textTransform: "none",
            backgroundColor: requested ? "#1282f3" : "transparent",
            color: requested ? "#fff" : "#1282f3",
          }}
          onClick={() => {
            if (requested) return;
            handleConnectToggle();
          }}
        >
          {requested ? "Pending" : "Connect"}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}