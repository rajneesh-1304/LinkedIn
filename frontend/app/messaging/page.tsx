'use client'
import Sidebar from "@/components/Message/Sidebar/Sidebar";
import "./messaging.css";
import Navbar from "@/components/Navbar/Navbar";
import { Box } from "@mui/material";
import { useState } from "react";
import ChatWindow from "@/components/Message/ChatWindow/ChatWindow";

export default function MessagingLayout() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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