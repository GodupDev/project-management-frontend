import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useAuth } from "./AuthContext";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useUpdatePersonalInfoMutation,
} from "../services/userProfileApi";
import {
  setProfile,
  setLoading,
  setError,
  clearProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/slices/userProfileSlice";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // RTK Query hooks
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetProfileQuery(undefined, {
    skip: !user, // Skip query if no user is logged in
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation();

  // Sync RTK Query state with Redux state
  useEffect(() => {
    if (profileData) {
      dispatch(setProfile(profileData));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isProfileLoading));
  }, [isProfileLoading, dispatch]);

  useEffect(() => {
    if (profileError) {
      dispatch(setError(profileError.message));
      message.error(profileError.message || "Failed to fetch profile");
    }
  }, [profileError, dispatch]);

  // Clear profile when user logs out
  useEffect(() => {
    if (!user) {
      dispatch(clearProfile());
    }
  }, [user, dispatch]);

  // Profile update handlers
  const handleUpdateProfile = async (profileData) => {
    try {
      const result = await updateProfile(profileData).unwrap();
      message.success("Profile updated successfully");
      return result;
    } catch (error) {
      message.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  const handleUpdateAvatar = async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const result = await updateAvatar(formData).unwrap();
      message.success("Avatar updated successfully");
      return result;
    } catch (error) {
      message.error(error.message || "Failed to update avatar");
      throw error;
    }
  };

  const handleUpdatePassword = async (passwordData) => {
    try {
      const result = await updatePassword(passwordData).unwrap();
      message.success("Password updated successfully");
      return result;
    } catch (error) {
      message.error(error.message || "Failed to update password");
      throw error;
    }
  };

  const handleUpdatePersonalInfo = async (personalInfo) => {
    try {
      const result = await updatePersonalInfo(personalInfo).unwrap();
      message.success("Personal info updated successfully");
      return result;
    } catch (error) {
      message.error(error.message || "Failed to update personal info");
      throw error;
    }
  };

  const value = {
    profile: useSelector(selectProfile),
    loading: useSelector(selectProfileLoading),
    error: useSelector(selectProfileError),
    updateProfile: handleUpdateProfile,
    updateAvatar: handleUpdateAvatar,
    updatePassword: handleUpdatePassword,
    updatePersonalInfo: handleUpdatePersonalInfo,
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
