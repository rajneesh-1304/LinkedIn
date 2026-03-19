import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { deleteUserr, loginUser, logoutUser, registerUser } from "./service";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const loginThunk = createAsyncThunk(
  "auth",
  async (userData: any, { rejectWithValue }) => {
    try {
      return await loginUser(userData);
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'auth/delete',
  async (id: any, { rejectWithValue }) => {
    try {
      return await deleteUserr(id);
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutUser();
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
)


const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    clearUsers: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error.message || "Registration failed";
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        // state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        // state.loading = false;
        state.error = String(action.payload) || "Login failed";
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload, 'fkjlasdjkfl;jkasldjkflajksldflskdlfalsjdkflajksl')
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        // state.loading = false;
        state.error = String(action.payload) || "Login failed";
      })


  },
});

export const { logout, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
