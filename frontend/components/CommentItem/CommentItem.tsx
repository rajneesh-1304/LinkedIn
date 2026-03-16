'use client';

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addCommentThunk } from "@/redux/features/post/postSlice";
import './comment.css';

type Props = {
  comment: any;
  postId: string;
  userId: any;
  level?: number;
};

const CommentItem = ({ comment, postId, userId, level = 0 }: Props) => {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  const dispatch = useAppDispatch();

  const handleReply = () => {
    if (!replyText.trim()) return;

    const data = {
      userId,
      text: replyText,
      parentId: comment.id,
    };

    dispatch(addCommentThunk({ id: postId, data }));
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div style={{ marginLeft: level * 20, marginTop: 5 }}>
      <div className="comment-item">
        <strong>
          {comment.user?.firstName} {comment.user?.lastName}:
        </strong>{" "}
        {comment.comment || comment.text}
      </div>

      <button onClick={() => setShowReply(!showReply)}>
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply && (
        <div style={{ marginTop: 5 }}>
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply}>Post</button>
        </div>
      )}
      

      {comment.replies?.map((reply: any) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          userId={userId}
          level={level + 1}
        />
      ))}
    </div>
  );
};

export default CommentItem;