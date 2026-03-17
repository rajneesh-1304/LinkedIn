import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotification } from "./notificationService";

interface NotificationState {
  notifications: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const getNotificationThunk = createAsyncThunk(
  "notification/get",
  async ({userId}:any, { rejectWithValue }) => {
    try {
        console.log('id:', userId)
      return await getNotification(userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// export const getProfileThunk = createAsyncThunk(
//   'profile/get',
//   async (userId:any, { rejectWithValue }) => {
//     try {
//       return await getProfile(userId );
//     } catch (err: any) {
//       return rejectWithValue(err.response);
//     }
//   }
// )



const notificationSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.error = null;
    },

    clearUsers: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getNotificationThunk.fulfilled, (state, action)=>{
            state.notifications = action.payload.notifications,
            state.loading = false;
        })
        .addCase(getNotificationThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getNotificationThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Profile Adding Failed';
        })
  },
});

export default notificationSlice.reducer;