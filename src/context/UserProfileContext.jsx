import { createContext, useContext, useState, useEffect } from 'react';
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

  const [profileId, setProfileId] = useState(null);
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

  /**
   * An object representing the context value for user profiles.
   * 
   * @property {string} profileId - The current profile ID.
   * @property {Function} setProfileId - Function to update the profile ID.
   * @property {Object} profile - The current user profile data.
   * @property {boolean} loading - Indicates if the profile data is being fetched.
   * @property {Error|null} error - Error information if fetching/updating profile fails.
   * @property {Function} updateProfile - Function to update the user profile.
   * @property {Function} getProfileById - Function to fetch a profile by ID.
   */
  const value = {
    profileId,
    setProfileId,
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
