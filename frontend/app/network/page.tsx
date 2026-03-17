"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import NetworkLeftSidebar from "../../components/networks/leftside/LeftSideBar";
import SuggestionCard from "../../components/networks/suggestion/SuggestionCard";
import LinkedInNavbar from "@/components/Navbar/Navbar";
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import "./network.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPendingConnectionThunk, getSuggestionConnectionThunk, removeConnectionThunk, updateConnectionThunk } from "@/redux/features/connection/connectionSlice";
import { TrackChanges } from "@mui/icons-material";

export default function MyNetworkPage() {

  const users = useAppSelector(state => state.connection.suggesstionConnection);
  const pendingRequest = useAppSelector(state => state.connection.pendingConnection);
  const [requests, setRequests] = useState([]);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.currentUser);
  const id = currentUser?.id;
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(getSuggestionConnectionThunk({ id }));
    dispatch(getPendingConnectionThunk({ id }));
  }

  const acceptRequest = async (userId: string) => {
    try {
      await dispatch(updateConnectionThunk({ id, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id }));
    } catch (error) {
      console.log(error);
    }
  }

  const rejectRequest = async (userId: string) => {
    try {
      await dispatch(removeConnectionThunk({ id, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id }));
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="my-network-wrapper">

      <LinkedInNavbar />

      <div className="my-network-container">

        <aside className="left-column">
          <NetworkLeftSidebar />
        </aside>

        <main className="main-column">

          {pendingRequest.length > 0 && (
            <Paper className="suggestion-section">

              <div className="suggestion-header">
                <h3>Invitations</h3>
              </div>

              {pendingRequest.map((req) => (

                <Box
                  key={req.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderBottom: "1px solid #eee",
                  }}
                >

                  <Avatar
                    src={req.profilePicture}
                  />

                  <Box sx={{ flex: 1 }}>

                    <Typography sx={{ fontWeight: 600 }}>
                      {req.firstName} {req.lastName}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#666",
                      }}
                    >
                      {req.headline}
                    </Typography>

                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => rejectRequest(req.id)}
                  >
                    Ignore
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => acceptRequest(req.id)}
                  >
                    Accept
                  </Button>

                </Box>

              ))}
            </Paper>
          )}

          <div className="suggestion-section">

            <div className="suggestion-header">
              <h3>People you may know</h3>
            </div>

            <div className="suggestion-grid">

              {users.length === 0 ? (

                <div className="no-users">
                  No suggestions available
                </div>

              ) : (

                users.filter((user) => user.id !== currentUser?.id).map((user) => (
                  <SuggestionCard
                    key={user.id}
                    user={user}
                  // onRemove={removeUser}
                  />
                ))

              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}