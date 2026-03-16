"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import NetworkLeftSidebar from "../../components/networks/leftside/LeftSideBar";
import SuggestionCard from "../../components/networks/suggestion/SuggestionCard";
import LinkedInNavbar from "@/components/Navbar/Navbar";
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import "./network.css";
import { fetchUsersThunk } from "@/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function MyNetworkPage() {

  const users= useAppSelector(state=> state.users.users);
  const [requests, setRequests] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(fetchUsersThunk({}));
  }

  // REMOVE CARD (❌ button)
  // const removeUser = (id: string) => {
  //   setUsers((prev) => prev.filter((user) => user.id !== id));
  // };

  // ACCEPT CONNECTION
  // const acceptRequest = async (connectionId: string) => {
  //   try {

  //     const req = requests.find((r) => r.id === connectionId);

  //     await axios.post(
  //       `${API}/connections/accept/${connectionId}`,
  //       {},
  //       { withCredentials: true }
  //     );

  //     // remove invitation
  //     setRequests((prev) =>
  //       prev.filter((r) => r.id !== connectionId)
  //     );

  //     // remove suggestion card
  //     if (req) {
  //       setUsers((prev) =>
  //         prev.filter((user) => user.id !== req.sender.id)
  //       );
  //     }

  //   } catch (error) {
  //     console.error("Accept request failed:", error);
  //   }
  // };

  // // REJECT CONNECTION
  // const rejectRequest = async (connectionId: string) => {
  //   try {

  //     const req = requests.find((r) => r.id === connectionId);

  //     await axios.post(
  //       `${API}/connections/reject/${connectionId}`,
  //       {},
  //       { withCredentials: true }
  //     );

  //     // remove invitation
  //     setRequests((prev) =>
  //       prev.filter((r) => r.id !== connectionId)
  //     );

  //     // add user back to suggestions
  //     if (req) {
  //       setUsers((prev) => {

  //         const exists = prev.some(
  //           (user) => user.id === req.sender.id
  //         );

  //         if (exists) return prev;

  //         return [...prev, req.sender];

  //       });
  //     }

  //   } catch (error) {
  //     console.error("Reject request failed:", error);
  //   }
  // };

  // if (loading) {
  //   return <div className="network-loading">Loading network...</div>;
  // }

  return (
    <div className="my-network-wrapper">

      <LinkedInNavbar />

      <div className="my-network-container">

        <aside className="left-column">
          <NetworkLeftSidebar />
        </aside>

        <main className="main-column">

          {requests.length > 0 && (
            <Paper className="suggestion-section">

              <div className="suggestion-header">
                <h3>Invitations</h3>
              </div>

              {requests.map((req) => (

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
                    // src={
                    //   req.sender.profilePicture
                    //     ? backendUrl + req.sender.profilePicture
                    //     : "/default-avatar.png"
                    // }
                  />

                  <Box sx={{ flex: 1 }}>

                    <Typography sx={{ fontWeight: 600 }}>
                      {/* {req.sender.firstName} {req.sender.lastName} */}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#666",
                      }}
                    >
                      {/* {req.sender.headline} */}
                    </Typography>

                  </Box>

                  <Button
                    variant="outlined"
                    // onClick={() => rejectRequest(req.id)}
                  >
                    Ignore
                  </Button>

                  <Button
                    variant="contained"
                    // onClick={() => acceptRequest(req.id)}
                  >
                    Accept
                  </Button>

                </Box>

              ))}
            </Paper>
          )}

          {/* SUGGESTIONS */}
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

                users.map((user) => (
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