import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFollowing, checkFollowing, getTotalFollowing, removeFollowing } from "./followingService";

interface FollowingState {
  following:any[];
  loading: boolean;
  totalFollowing: 0;
  error: string | null;
}

const initialState: FollowingState = {
  following:[],
  loading: false,
  totalFollowing: 0,
  error: null,
};

export const addFollowingThunk = createAsyncThunk(
  "following/add",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await addFollowing(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const removeFollowingThunk = createAsyncThunk(
  "following/remove",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await removeFollowing(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const checkFollowingThunk = createAsyncThunk(
  "following/check",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await checkFollowing(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const GetTotalFollowingThunk = createAsyncThunk(
  "following/get",
  async ({id}:any, { rejectWithValue }) => {
    try {
      return await getTotalFollowing(id);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const followingSlice = createSlice({
  name: "following",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(addFollowingThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addFollowingThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addFollowingThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Add following failed';
        })

        .addCase(removeFollowingThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(removeFollowingThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeFollowingThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Remove following failed';
        })

        .addCase(GetTotalFollowingThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.totalFollowing = action.payload;
        })
        .addCase(GetTotalFollowingThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetTotalFollowingThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Remove following failed';
        })

  },
});
export default followingSlice.reducer;
