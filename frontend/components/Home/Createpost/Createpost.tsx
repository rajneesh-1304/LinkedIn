'use client';
import React, { useEffect, useState } from 'react'
import './post.css';
import Post from '@/components/PostModal/Post';
import PostCard from '@/components/PostCard/PostCard';
import { fetchPostThunk } from '@/redux/features/post/postSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUsersThunk } from '@/redux/features/profile/profileSlice';

const Createpost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const posts = useAppSelector(state => state.post.posts);
  const users = useAppSelector(state => state.profile.users);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.currentUser);
  const id: any = currentUser?.id;
  const currentProfile = useAppSelector(state => state.profile.currentProfile);

  // useEffect(() => {
  //   if (!currentProfile) {
  //     const formDataToSend={

  //     }

  //     dispatch(addProfileThunk({
  //       userId: id,
  //       formDataToSend: formDataToSend,
  //     }))
  //   }
  // }, [currentProfile])

  useEffect(() => {
    dispatch(fetchPostThunk(id));
    dispatch(fetchUsersThunk({ page: "1", limit: "10" }));
  }, [])

  return (
    <div className='container'>
      <div className='topSection'>
        <div className='avatar'>R</div>

        <input
          type="click"
          placeholder="Start a post"
          className='input'
          onClick={() => setIsOpen(true)}
        />
      </div>

      <div className='actions'>
        <button className='actionBtn'>
          📷 <span>Media</span>
        </button>

        <button className='actionBtn'>
          📅 <span>Event</span>
        </button>

        <button className='actionBtn'>
          📝 <span>Write article</span>
        </button>
      </div>

      {posts?.map((post) => {
        const user = users?.find((u) => u.id === post.userId);

        return (
          <PostCard
            key={post.id}
            post={post}
            user={user}
          />
        );
      })}

      {/* {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))} */}

      {isOpen && <Post close={() => setIsOpen(false)} />}
    </div>
  )
}

export default Createpost