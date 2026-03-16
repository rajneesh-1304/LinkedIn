import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addEducation, addExperience, addProfile, getEducation, getExperience, getProfile } from "./profileService";

interface ProfileState {
  profile:any[];
  currentProfile: any ;
  currentEducation: any[];
  currentExperience: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile:[],
  currentProfile: null,
  currentEducation: [],
  currentExperience: [],
  loading: false,
  error: null,
};

export const addProfileThunk = createAsyncThunk(
  "profile/add",
  async ({userId, formDataToSend}:any, { rejectWithValue }) => {
    try {
      return await addProfile(userId, formDataToSend);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getProfileThunk = createAsyncThunk(
  'profile/get',
  async (userId:any, { rejectWithValue }) => {
    try {
      return await getProfile(userId );
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
)

export const addEducationThunk = createAsyncThunk(
  "profile/education",
  async ({userId, formData}:any, { rejectWithValue }) => {
    try {
      return await addEducation(userId, formData);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getEducationThunk = createAsyncThunk(
  'profile/geteducation',
  async (userId:any, { rejectWithValue }) => {
    try {
      return await getEducation(userId );
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
)

export const addExperienceThunk = createAsyncThunk(
  "profile/experience",
  async ({userId, formData}:any, { rejectWithValue }) => {
    try {
      return await addExperience(userId, formData);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const getExperienceThunk = createAsyncThunk(
  'profile/getexperience',
  async (userId:any, { rejectWithValue }) => {
    try {
      return await getExperience(userId );
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
)



const profileSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentProfile = null;
      state.loading = false;
      state.error = null;
    },

    clearUsers: (state) => {
      state.currentProfile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(addProfileThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addProfileThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addProfileThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Profile Adding Failed';
        })
        .addCase(getProfileThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentProfile = action.payload.user;
        })
        .addCase(getProfileThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProfileThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Profile fetching Failed';
        })
        .addCase(addEducationThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addEducationThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addEducationThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education detail Adding Failed';
        })
        .addCase(getEducationThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentEducation = action.payload.edu;
        })
        .addCase(getEducationThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getEducationThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })
        .addCase(addExperienceThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addExperienceThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addExperienceThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Experience detail Adding Failed';
        })
        .addCase(getExperienceThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentExperience = action.payload.exp;
        })
        .addCase(getExperienceThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getExperienceThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Experience fetching Failed';
        })


    //   .addCase(addAddressThunk.fulfilled, (state, action) => {
    //     // state.currentAddress = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(addAddressThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(addAddressThunk.rejected, (state, action) => {
    //     state.error = action.error.message || "Add Address failed";
    //   })
    //   .addCase(getAddressThunk.fulfilled, (state, action) => {
    //     state.currentAddress = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(getAddressThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getAddressThunk.rejected, (state, action) => {
    //     state.error = action.error.message || "Add Address failed";
    //   })
    //   .addCase(getAllAddressThunk.fulfilled, (state, action) => {
    //     state.address = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(getAllAddressThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getAllAddressThunk.rejected, (state, action) => {
    //     state.error = action.error.message || "Add Address failed";
    //   })
  },
});

export const { logout, clearUsers } = profileSlice.actions;
export default profileSlice.reducer;
