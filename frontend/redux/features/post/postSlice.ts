import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addComment, addPost, fetchPost, isLiked, repost, toggleLike } from "./postService";

interface Post {
  id: string;
  text: string;
  image: string;
}

interface PostState {
  posts: any[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const addPostThunk = createAsyncThunk(
  "post/add",
  async ({id, postData}: any, { rejectWithValue }) => {
    try {
      return await addPost(id, postData);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const fetchPostThunk = createAsyncThunk(
  "post/get",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchPost(userId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleLikeThunk = createAsyncThunk(
  'patch/toggleLike',
  async ({id, data}: any, { rejectWithValue }) => {
    try {
      return await toggleLike(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const addCommentThunk = createAsyncThunk(
  'patch/addComment',
  async ({id, data}: any, { rejectWithValue }) => {
    try {
      return await addComment(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const isLikedThunk = createAsyncThunk(
  'get/isLiked',
  async ({id, data}: any, { rejectWithValue }) => {
    try {
      return await isLiked(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const repostThunk = createAsyncThunk(
  'post/repost',
  async ({id, userId, name}: any, { rejectWithValue }) => {
    try {
      return await repost(id, userId, name);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// export const fetchUsersThunk = createAsyncThunk(
//   'users/fetchAll',
//   async (
//     { page, limit }: any,
//     { rejectWithValue }
//   ) => {
//     try {
//       return await fetchUsers({ page, limit, });
//     } catch (err: any) {
//       return rejectWithValue(err?.message || 'Failed to fetch questions');
//     }
//   }
// );

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(addPostThunk.fulfilled, (state, action) => {
    //   })
      .addCase(addPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.error = action.error.message || "Post adding failed";
      })
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostThunk.rejected, (state, action) => {
        state.error = action.error.message || "Post fetching failed";
      })

  },
});

export default postSlice.reducer;
