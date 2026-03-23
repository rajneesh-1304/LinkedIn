"use client";
import "./chatwindow.css";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiPicker from "emoji-picker-react";
import { IoIosSend } from "react-icons/io";   
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import { useAppSelector } from "@/redux/hooks";

export default function ChatWindow({
  selectedUser,
  messages,
  messageText,
  setMessageText,
  showEmojiPicker,
  setShowEmojiPicker,
}: any) {
  const currentUser = useAppSelector(state => state.users.currentUser);

  useEffect(() => {
    if (!currentUser) return;

    const socket = getSocket();
    if (!socket) return;

    socket.connect();
    socket.emit("onConnection", currentUser);
    console.log('connected....')

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("taskUpdated", () => {
    });

    socket.on('taskCreated', () => {
    })

    return () => {
      socket.off("taskUpdated");
      socket.off('taskCreated');
    };
  }, []);


  return (
    <div className="chat">
      <div className="chat-header" style={{display:"flex", alignItems: "center", gap:"5px"}}>
        {selectedUser? <Avatar src={selectedUser?.profilePicture} /> : <></>}
        <Typography fontWeight={600}>
          {selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : "Select a conversation"}
        </Typography>
      </div>

      <div className="chat-messages">
        {messages.map((msg: any) => (
          <div key={msg.id} className="message-row">
            <div className="message-bubble">{msg.message}</div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="chat-input-area">
          <div className="chat-input">
            <IconButton onClick={() => setShowEmojiPicker((p: boolean) => !p)}>
              <SentimentSatisfiedAltIcon />
            </IconButton>

            <input
              value={messageText}
              placeholder="Type a message"
              onChange={(e) => setMessageText(e.target.value)}
            />

            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker
                  onEmojiClick={(e: any) =>
                    setMessageText((prev: string) => prev + e.emoji)
                  }
                />
              </div>
            )}
          </div>

          <div className="chat-actions">
            <div>
              <IconButton size="small">
                <ImageIcon />
              </IconButton>
              <IconButton size="small">
                <AttachFileIcon />
              </IconButton>
            </div>

            <Button variant="contained" className="send-btn">
              Send <IoIosSend />
            </Button>
          </div>
          
        </div>
      )}
    </div>
  );
}