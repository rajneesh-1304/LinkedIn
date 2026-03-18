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
  getPendingConnectionThunk,
  removeConnectionThunk,
  updateConnectionThunk,
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

  const currentUserId = currentUser?.id;
  const userId = user.id;

  const [followed, setFollowed] = useState(false);

  const [connectionStatus, setConnectionStatus] = useState<null | {
    status: string;
    requesterId: any;
    userId: any;
    isRequester: boolean;
  }>(null);

  const [followersCount, setFollowersCount] = useState(user.followersCount || 0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<"success" | "error">("success");

  const checkFollowStatus = async () => {
    if (!currentUserId || !userId) return;

    try {
      const res = await dispatch(
        checkFollowingThunk({ id: currentUserId, userId })
      );
      setFollowed(res?.payload);
    } catch (err) {
      console.error(err);
    }
  };

  const checkConnectionStatus = async () => {
    if (!currentUserId || !userId) return;

    try {
      const res = await dispatch(
        checkConnectionThunk({ id: currentUserId, userId })
      ).unwrap();

      setConnectionStatus(res || null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUserId || !userId) return;

    try {
      if (followed) {
        await dispatch(
          removeFollowingThunk({ id: currentUserId, userId })
        ).unwrap();

        setFollowed(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
        setSnackbarMessage("Unfollowed");
      } else {
        await dispatch(
          addFollowingThunk({ id: currentUserId, userId })
        ).unwrap();

        setFollowed(true);
        setFollowersCount((prev) => prev + 1);
        setSnackbarMessage("Followed");
      }

      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleConnect = async () => {
    if (!currentUserId || !userId) return;

    try {
      await dispatch(
        addConnectionThunk({ id: currentUserId, userId })
      ).unwrap();

      setConnectionStatus({
        status: "PENDING",
        requesterId: currentUserId,
        userId,
        isRequester: true,
      });

      setSnackbarMessage("Request sent");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async () => {
    try {
      await dispatch(updateConnectionThunk({ id: currentUserId, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id: currentUserId }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(removeConnectionThunk({ id: currentUserId, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id: currentUserId }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFollowStatus();
    checkConnectionStatus();
  }, [currentUserId, userId]);

  return (
    <Paper elevation={1}>
      <Box
        sx={{
          backgroundColor: "#1282f3",
          height: "80px",
          position: "relative",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onRemove?.(user.id)}
          sx={{ position: "absolute", top: 4, right: 4, color: "#fff" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: -4 }}>
        <Avatar
          src={user.profilePicture}
          sx={{ width: 64, height: 64, border: "3px solid white" }}
        />
      </Box>

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography fontSize={13} color="text.secondary">
          {user.headline}
        </Typography>

        <Button
          startIcon={!followed ? <AddIcon /> : undefined}
          variant={followed ? "contained" : "outlined"}
          fullWidth
          sx={{ mt: 2, borderRadius: "999px", textTransform: "none" }}
          onClick={handleFollowToggle}
        >
          {followed ? "Following" : "Follow"}
        </Button>

        {connectionStatus?.status === "PENDING" ? (
          connectionStatus.isRequester ? (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1, borderRadius: "999px" }}
            >
              Pending
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button fullWidth variant="contained" onClick={handleAccept}>
                Accept
              </Button>
              <Button fullWidth variant="outlined" onClick={handleReject}>
                Reject
              </Button>
            </Box>
          )
        ) : (
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, borderRadius: "999px" }}
            onClick={handleConnect}
          >
            Connect
          </Button>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Paper>
  );
}