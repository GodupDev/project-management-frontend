import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useLanguage } from "./LanguageContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Here you would typically validate the token with your backend
        // For now, we'll just set a mock user
        setUser({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser = {
        id: 1,
        name: "Test User",
        email: email,
      };

      // Mock token
      const token = "mock-jwt-token";

      // Store token
      localStorage.setItem("token", token);

      // Set user
      setUser(mockUser);

      message.success(t("loginSuccess"));
      navigate("/dashboard");

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      message.error(
        t("loginFailed") + ": " + (error.message || t("unknownError")),
      );
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful signup
      const mockUser = {
        id: 1,
        name: name,
        email: email,
      };

      // Mock token
      const token = "mock-jwt-token";

      // Store token
      localStorage.setItem("token", token);

      // Set user
      setUser(mockUser);

      message.success(t("signupSuccess"));
      navigate("/dashboard");

      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      message.error(
        t("signupFailed") + ": " + (error.message || t("unknownError")),
      );
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Remove token
      localStorage.removeItem("token");

      // Clear user
      setUser(null);

      // Navigate to login
      navigate("/login");

      message.success(t("logoutSuccess"));
    } catch (error) {
      console.error("Logout failed:", error);
      message.error(t("logoutFailed"));
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For now, we'll just update the local state
      setUser((prevUser) => ({
        ...prevUser,
        ...userData,
      }));

      message.success(t("profileUpdateSuccess"));
      return { success: true };
    } catch (error) {
      console.error("Profile update failed:", error);
      message.error(t("profileUpdateFailed"));
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
