import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addConnection, checkConnection, getPendingConnection, getSuggesstionConnection, getTotalConnection, removeConnection, updateConnection } from "./connectionService";

interface ConnectionState {
  connection:any[];
  suggesstionConnection: any[],
  pendingConnection: any[],
  totalConnection: 0;
  loading: boolean;
  error: string | null;
}

const initialState: ConnectionState = {
  connection:[],
  suggesstionConnection: [],
  pendingConnection: [],
  totalConnection:0,
  loading: false,
  error: null,
};

export const addConnectionThunk = createAsyncThunk(
  "connection/add",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await addConnection(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const removeConnectionThunk = createAsyncThunk(
  "connection/remove",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await removeConnection(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateConnectionThunk = createAsyncThunk(
  "connection/update",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await updateConnection(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const checkConnectionThunk = createAsyncThunk(
  "connection/check",
  async ({id, userId}:any, { rejectWithValue }) => {
    try {
      return await checkConnection(id, userId);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getTotalConnectionThunk = createAsyncThunk(
  "connection/gettotal",
  async ({id}:any, { rejectWithValue }) => {
    try {
      return await getTotalConnection(id);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getSuggestionConnectionThunk = createAsyncThunk(
  "connection/getsuggestion",
  async ({id}:any, { rejectWithValue }) => {
    try {
      return await getSuggesstionConnection(id);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getPendingConnectionThunk = createAsyncThunk(
  "connection/getpending",
  async ({id}:any, { rejectWithValue }) => {
    try {
      return await getPendingConnection(id);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);


const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(addConnectionThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Add connection failed';
        })

        .addCase(removeConnectionThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(removeConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Remove connection failed';
        })

        .addCase(updateConnectionThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(updateConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Failed updating connection';
        })

        .addCase(getTotalConnectionThunk.fulfilled, (state, action)=>{
          state.totalConnection = action.payload;
            state.loading = false;
        })
        .addCase(getTotalConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getTotalConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Failed updating connection';
        })

        .addCase(getSuggestionConnectionThunk.fulfilled, (state, action)=>{
          state.suggesstionConnection = action.payload.users;
            state.loading = false;
        })
        .addCase(getSuggestionConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getSuggestionConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Failed updating connection';
        })

        .addCase(getPendingConnectionThunk.fulfilled, (state, action)=>{
          state.pendingConnection = action.payload.users;
            state.loading = false;
        })
        .addCase(getPendingConnectionThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getPendingConnectionThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Failed updating connection';
        })
  },
});
export default connectionSlice.reducer;
