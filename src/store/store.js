import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./slices/authSlice";
import userProfileReducer from "./slices/userProfileSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    userProfile: userProfileReducer,
    project: projectReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
