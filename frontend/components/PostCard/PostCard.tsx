'use client';

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikeThunk, addCommentThunk, repostThunk } from "@/redux/features/post/postSlice";
import CommentItem from "../CommentItem/CommentItem";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

import './postcard.css'

type Props = {
  post: any;
};

const PostCard = ({ post }: Props) => {

  const isRepost = post.type === "repost";
  const actualPost = isRepost ? post.originalPost : post;
  const displayUser = isRepost ? actualPost?.user : post.user;

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const currentProfile = useAppSelector((state) => state.profile.currentProfile);
  const userId = currentUser?.id;

  const dispatch = useAppDispatch();

  const formatRelativeShort = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = differenceInSeconds(now, past);
    if (seconds < 60) return `${seconds}s`;
    const minutes = differenceInMinutes(now, past);
    if (minutes < 60) return `${minutes}m`;
    const hours = differenceInHours(now, past);
    if (hours < 24) return `${hours}h`;
    const days = differenceInDays(now, past);
    return `${days}d`;
  };

  useEffect(() => {
    if (!actualPost) return;

    setLiked(actualPost.isLiked || false);
    setReposted(actualPost.isReposted || false);
    setLikesCount(actualPost.likesCount || 0);
    setRepostCount(actualPost.repostCount || 0);
    setComments(actualPost.comments || []);
  }, [actualPost]);

  if (!actualPost) return null;

  const handleLike = async () => {
    const prev = liked;
    setLiked(!prev);
    setLikesCount(prev ? likesCount - 1 : likesCount + 1);

    try {
      await dispatch(toggleLikeThunk({ id: actualPost.id, userId })).unwrap();
    } catch {
      setLiked(prev);
      setLikesCount(actualPost.likesCount || 0);
    }
  };

  const handleRepost = async () => {
    const prev = reposted;
    setReposted(!prev);
    setRepostCount(prev ? repostCount - 1 : repostCount + 1);

    try {
      if (actualPost.userId === userId) throw 'User cant repost his post';
      await dispatch(
        repostThunk({
          id: actualPost.id,
          userId,
          name: currentProfile.firstName
        })
      ).unwrap();
    } catch {
      setReposted(prev);
      setRepostCount(actualPost.repostCount || 0);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Math.random().toString(),
      user: currentUser,
      comment: commentText,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentText("");

    try {
      await dispatch(
        addCommentThunk({
          id: actualPost.id,
          data: { userId, text: commentText }
        })
      ).unwrap();
    } catch {
      setComments(actualPost.comments || []);
    }
  };

  return (
    <div className={`post-card ${isRepost ? "repost-card" : ""}`} style={{ marginBottom: "10px" }}>

      {isRepost && (
        <div className="repost-label">
          🔁 {post.repostedBy} reposted this
        </div>
      )}

      <div className="post-header">
        <div className="avatar">
          {displayUser?.profilePicture ? (
            <img src={displayUser.profilePicture} alt="avatar" />
          ) : (
            <div className="avatar-initial">
              {displayUser?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div>
          <h4>{displayUser?.firstName} {displayUser?.lastName}</h4>
          <p className="role">{displayUser?.headline}</p>
          <p className="role">{displayUser?.createdAt ? formatRelativeShort(displayUser.createdAt) : ''}</p>
        </div>
      </div>

      <p className="post-text">{actualPost.text}</p>

      {actualPost.image && actualPost.image.length > 0 && (
        <div className={`image-gallery images-${actualPost.image.length}`}>
          {actualPost.image.slice(0, 4).map((imgUrl: string, idx: number) => (
            <div key={idx} className="image-wrapper">
              <img src={imgUrl} className="post-image" />
              {idx === 3 && actualPost.image.length > 4 && (
                <div className="overlay">
                  +{actualPost.image.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="divider"></div>

      <div className="post-actions">
        <button onClick={handleLike} style={{ color: liked ? "mediumslateblue" : "black" }}>
          <ThumbUpOffAltIcon /> {liked ? "Liked" : "Like"} ({likesCount})
        </button>

        <button onClick={() => setShowComments(!showComments)}>
          💬 Comment ({comments.length})
        </button>

        <button onClick={handleRepost} style={{ color: reposted ? "mediumslateblue" : "black" }}>
          <RepeatRoundedIcon /> {reposted ? "Reposted" : "Repost"} ({repostCount})
        </button>

        <button>
          <SendRoundedIcon /> Send
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
          />
          <button onClick={handleComment} disabled={!commentText.trim()}>
            Post
          </button>

          <div className="comments-list">
            {comments?.map((c: any) => (
              <CommentItem key={c.id} comment={c} postId={actualPost.id} userId={userId} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default PostCard;