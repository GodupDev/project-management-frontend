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

  // Lấy profile từ Redux store
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const profile = useSelector(selectProfile);

  // Fetch profile khi user._id thay đổi
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserProfile(user._id));
    }
  }, [user, dispatch]);

  // Clear profile khi logout
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

  const handleGetProfileById = async (userId) => {
    try {
      const result = await dispatch(fetchUserProfile(userId)).unwrap();
      return result;
    } catch (error) {
      message.error(error.message || t("getProfileFailed"));
      throw error;
    }
  };

  const value = {
    profile,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    getProfileById: handleGetProfileById, // thêm vào context
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
