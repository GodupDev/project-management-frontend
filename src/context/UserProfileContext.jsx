import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";
import {
  fetchUserProfile,
  updateUserProfile,
  clearProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/slices/userProfileSlice";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Get profile data from Redux store
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  // Fetch profile when user is logged in
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserProfile(user._id));
    }
  }, [user?._id, dispatch]);

  // Clear profile when user logs out
  useEffect(() => {
    if (!user) {
      dispatch(clearProfile());
    }
  }, [user, dispatch]);

  // Profile update handlers
  const handleUpdateProfile = async (profileData) => {
    try {
      const result = await dispatch(updateUserProfile(profileData)).unwrap();
      message.success(t("successProfileUpdate"));
      return result;
    } catch (error) {
      message.error(error.message || t("successProfileUpdateFailed"));
      throw error;
    }
  };

  const value = {
    profile,
    loading,
    error,
    updateProfile: handleUpdateProfile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
