import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const { setProfile, setLoading, setError, clearProfile } =
  userProfileSlice.actions;

// Selectors
export const selectProfile = (state) => state.userProfile.profile;
export const selectProfileLoading = (state) => state.userProfile.loading;
export const selectProfileError = (state) => state.userProfile.error;

export default userProfileSlice.reducer;
