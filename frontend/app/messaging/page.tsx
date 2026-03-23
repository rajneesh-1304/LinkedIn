'use client'
import Sidebar from "@/components/Message/Sidebar/Sidebar";
import "./messaging.css";
import Navbar from "@/components/Navbar/Navbar";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ChatWindow from "@/components/Message/ChatWindow/ChatWindow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getConnectionByIdThunk } from "@/redux/features/profile/profileSlice";

export default function MessagingLayout() {
  const currentUser = useAppSelector(state=> state.users.currentUser);
  const id = currentUser?.id;
  const users = useAppSelector(state => state.profile.currentUserConnection);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useAppDispatch();
  

  useEffect(()=>{
    dispatch(getConnectionByIdThunk(id));
  },[id])

  return (
    <>
      <div className="contain">
        <Navbar />

      <Box className="messaging-container">
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          search={search}
          setSearch={setSearch}
        />

        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
        />
      </Box>
      </div>
    </>
  );
}