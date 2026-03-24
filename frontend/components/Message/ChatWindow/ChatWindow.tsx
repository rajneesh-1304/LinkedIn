"use client";
import "./chatwindow.css";
import {
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
import { useEffect, useMemo, useState } from "react";
import { getSocket } from "@/utils/socket";
import { useAppSelector } from "@/redux/hooks";
import { formatDistance } from 'date-fns'

export default function ChatWindow({
  selectedUser,
  messageText,
  setMessageText,
  showEmojiPicker,
  setShowEmojiPicker,
}: any) {

  const socket: any = useMemo(() => getSocket(), []);
  const currentUser = useAppSelector((state) => state.profile.currentProfile);

  const [messages, setMessages] = useState<any[]>([]);
  const [typing, setTyping] = useState(false);

  const roomId =
    currentUser && selectedUser
      ? [currentUser.id, selectedUser.id].sort().join("_")
      : null;

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("joinRoom", roomId);
    socket.emit("fetchMessages", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
      setMessages([]);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("getMessages", (msgs: any[]) => {
      setMessages(msgs);
    });

    return () => {
      socket.off("getMessages");
    };
  }, []);

  useEffect(() => {
    socket.on("newMessage", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    socket.on("usertyping", (data: any) => {
      setTyping(true);
    });

    return () => {
      socket.off("usertyping");
    };
  }, []);

  const handleSendMessage = () => {
    setTyping(false);
    if (!messageText.trim() || !roomId) return;

    socket.emit("sendMessage", {
      roomId,
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: messageText,
    });

    setMessageText("");
  };

  return (
    <div className="chat">
      <div className="chat-header" style={{ display: "flex", gap: "5px" }}>
        {selectedUser && <Avatar src={selectedUser.profilePicture} />}
        <Typography fontWeight={600}>
          {selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : "Select a conversation"}
        </Typography>
      </div>

      <div className="chat-messages">
        {messages.map((msg: any) => {
          const isMe = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`message-row ${isMe ? "me" : "other"}`}
            >
              <div className="message-bubble" style={{display:"flex", gap:"6px", alignItems: "baseline"}}>
                {msg.message} <span style={{fontSize:"10px", color: 'gray'}}>{formatDistance(new Date(msg.createdAt), new Date(), { addSuffix: true })}</span>
              </div>
            </div>
          );
        })}
        {typing ? <p>typing</p> : <> </>}
      </div>

      {selectedUser && (
        <div className="chat-input-area">
          <div className="chat-input">
            <IconButton
              onClick={() => setShowEmojiPicker((p: boolean) => !p)}
            >
              <SentimentSatisfiedAltIcon />
            </IconButton>

            <input
              value={messageText}
              placeholder="Type a message"
              onChange={(e) => {
                setMessageText(e.target.value);

                if (roomId) {
                  socket.emit("typing", {
                    roomId,
                    userid: currentUser.id,
                  });
                }
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
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

            <Button
              variant="contained"
              className="send-btn"
              onClick={handleSendMessage}
            >
              Send <IoIosSend />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}