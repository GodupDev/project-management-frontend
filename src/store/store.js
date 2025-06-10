import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./slices/authSlice";
import userProfileReducer from "./slices/userProfileSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
