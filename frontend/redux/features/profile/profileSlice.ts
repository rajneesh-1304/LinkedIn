import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addEducation, addExperience, addProfile, addProfileFirst, addSkills, fetchAllSkills, fetchUsers, getConnectionById, getEducation, getExperience, getProfile, getProfileBySearchTerm, getSkills } from "./profileService";

interface ProfileState {
  users: any[];
  profile:any[];
  currentProfile: any ;
  currentEducation: any[];
  currentExperience: any[];
  totalSkills: any[],
  currentSkills: any[],
  currentUserConnection: any[],
  loading: boolean;
  error: string | null;
  searchUsers: any[];
}

const initialState: ProfileState = {
  users: [],
  profile:[],
  currentProfile: null,
  currentEducation: [],
  currentExperience: [],
  currentSkills: [],
  totalSkills: [],
  currentUserConnection: [],
  searchUsers: [],
  loading: false,
  error: null,
};

export const addProfileThunk = createAsyncThunk(
  "profile/add",
  async ({userId, data}:any, { rejectWithValue }) => {
    try {
      return await addProfile(userId, data);
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

export const fetchUsersThunk = createAsyncThunk(
  'users/fetchAll',
  async (
    { page, limit }: any,
    { rejectWithValue }
  ) => {
    try {
      return await fetchUsers({ page, limit, });
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch questions');
    }
  }
);

export const getAllSkillsThunk = createAsyncThunk(
  'skills/fetchAll',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      return await fetchAllSkills();
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch skills');
    }
  }
);

export const addSkillsThunk = createAsyncThunk(
  'skills/addskills',
  async (
    {id, skills}: any,
    { rejectWithValue }
  ) => {
    try {
      return await addSkills(id, skills);
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to add skills');
    }
  }
);

export const getSkillsThunk = createAsyncThunk(
  'skills/getskills',
  async (
    userId:any,
    { rejectWithValue }
  ) => {
    try {
      return await getSkills(userId);
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch skills');
    }
  }
);

export const  getConnectionByIdThunk = createAsyncThunk(
  'connection/byid',
  async (
    userId:any,
    { rejectWithValue }
  ) => {
    try {
      return await getConnectionById(userId);
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch connectionby id');
    }
  }
);

export const getUserBySearchTermThunk = createAsyncThunk(
  'profile/search/searchValue',
  async (
    searchValue: any,
    { rejectWithValue }
  ) => {
    try {
      return await getProfileBySearchTerm(searchValue);
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch connectionby id');
    }
  }
)

export const addProfileFirstThunk = createAsyncThunk(
  "profile/adddd",
  async (data:any, { rejectWithValue }) => {
    try {
      return await addProfileFirst(data);
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

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
        .addCase(addProfileThunk.pending, (state, action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addProfileThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Profile Adding Failed';
        })
        .addCase(addProfileFirstThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentProfile = action.payload.user;
        })
        .addCase(addProfileFirstThunk.pending, (state, action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addProfileFirstThunk.rejected, (state, action)=> {
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
        .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                const { user, page } = action.payload;
                state.users = user;
                state.loading = false;
              })
        .addCase(getAllSkillsThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.totalSkills = action.payload;
        })
        .addCase(getAllSkillsThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllSkillsThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })
        .addCase(getSkillsThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentSkills = action.payload;
        })
        .addCase(getSkillsThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getSkillsThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })
        .addCase(addSkillsThunk.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(addSkillsThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addSkillsThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })
        .addCase(getConnectionByIdThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentUserConnection = action.payload.users;
        })
        .addCase(getConnectionByIdThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getConnectionByIdThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })
        .addCase(getUserBySearchTermThunk.fulfilled, (state, action:any)=>{
            state.loading = false;
            state.searchUsers = action.payload.user;
        })
        .addCase(getUserBySearchTermThunk.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getUserBySearchTermThunk.rejected, (state, action)=> {
            state.error = action.error.message || 'Education details fetching Failed';
        })


  },
});

export const { logout, clearUsers } = profileSlice.actions;
export default profileSlice.reducer;
