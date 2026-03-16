'use client';

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikeThunk, addCommentThunk, repostThunk } from "@/redux/features/post/postSlice";
import CommentItem from "../CommentItem/CommentItem";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './postcard.css'

type Props = {
  post: any;
  user: any;
};

const PostCard = ({ post, user }: Props) => {

  const isRepost = post.type === "repost";
  const actualPost = isRepost ? post.post : post;

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const [liked, setLiked] = useState(post.isLiked);
  const [reposted, setReposted] = useState(post.isReposted);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [repostCount, setRepostCount] = useState(post.repostCount);
  const [comments, setComments] = useState(post.comments || []);

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userId = currentUser?.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLiked(post.isLiked);
    setReposted(post.isReposted);
    setLikesCount(post.likesCount);
    setRepostCount(post.repostCount);
    setComments(post.comments || []);
  }, [post]);

  const handleLike = async () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      await dispatch(toggleLikeThunk({ id: actualPost.id, userId })).unwrap();
    } catch (err) {
      setLiked(liked);
      setLikesCount(likesCount);
      console.error("Like action failed", err);
    }
  };

  const handleRepost = async () => {
    setReposted(!reposted);
    setRepostCount(reposted ? repostCount - 1 : repostCount + 1);
    
    try {
      if(actualPost.userId === userId){
        throw 'User cant repost his post';
      }
      await dispatch(repostThunk({ id: actualPost.id, userId })).unwrap();
    } catch (error) {
      setReposted(reposted);
      setRepostCount(repostCount);
      console.log('Repost action failed', error);
    }
  }

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
    setShowComments(true);

    try {
      await dispatch(addCommentThunk({ id: actualPost.id, data: { userId, text: commentText } })).unwrap();

    } catch (err) {
      setComments(comments);
      console.error("Add comment failed", err);
    }
  };

  return (
    <div className="post-card" style={{ marginBottom: "10px" }}>

      {isRepost && (
        <div className="repost-label">
          🔁 {post.userId} reposted
        </div>
      )}

      <div className="post-header">
        <img src={user?.profilePicture || "/default-avatar.png"} className="avatar" />
        <div>
          <h4>{user?.firstName} {user?.lastName}</h4>
          <p className="role">{user?.location}</p>
        </div>
      </div>

      <p className="post-text">{actualPost.text}</p>

      {actualPost.image && actualPost.image.length > 0 && (
        <div className="image-gallery">
          {actualPost.image.map((imgUrl: string, idx: number) => (
            <img key={idx} src={imgUrl} className="post-image" alt={`Post ${idx + 1}`} />
          ))}
        </div>
      )}

      <div className="divider"></div>

      {!isRepost && (
        <div className="post-actions">

          <button
            onClick={handleLike}
            style={{ color: liked ? "mediumslateblue" : "black" }}
          >
            <ThumbUpOffAltIcon /> {liked ? "Liked" : "Like"} ({likesCount})
          </button>

          <button onClick={() => setShowComments(!showComments)}>
            💬 Comment ({comments.length})
          </button>

          <button
            onClick={handleRepost}
            style={{ color: reposted ? "mediumslateblue" : "black" }}
          >
            <RepeatRoundedIcon /> {reposted ? "Reposted" : "Repost"} ({repostCount})
          </button>

          <button>
            <SendRoundedIcon /> Send
          </button>

        </div>
      )}

      {!isRepost && showComments && (
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