import React, { createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useLanguage } from "./LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  register,
  getCurrentUser,
  getUserByEmail,
  clearError,
} from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const lastErrorMessageRef = useRef(null);

  // Check for token and fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("🚀 Token:", token);
      if (!token) return;

      try {
        const log = await dispatch(getCurrentUser()).unwrap(); // unwrap giúp bắt lỗi rõ hơn
        console.log("🚀 User data:", log);
      } catch (error) {
        console.error("❌ Lỗi lấy thông tin người dùng:", error);
        localStorage.removeItem("token"); // token hỏng → xóa
      }
    };

    fetchUser();
  }, [dispatch]);

  // Check token validity
  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      // Try to get current user data to verify token
      const result = await dispatch(getCurrentUser()).unwrap();
      return !!result;
    } catch (error) {
      console.error(error);
      // If there's an error, token is invalid
      localStorage.removeItem("token");
      return false;
    }
  };

  useEffect(() => {
    if (error) {
      const errorKey = "authError";
      // Handle different error types
      if (error.includes("Invalid credentials")) {
        message.error({ content: t("invalidCredentials"), key: errorKey });
      } else if (error.includes("Email not found")) {
        message.error({ content: t("emailNotFound"), key: errorKey });
      } else if (error.includes("Account not activated")) {
        message.error({ content: t("accountNotActivated"), key: errorKey });
      } else if (error.includes("Too many attempts")) {
        message.error({ content: t("tooManyAttempts"), key: errorKey });
      } else if (error.includes("Network Error")) {
        message.error({ content: t("networkError"), key: errorKey });
      } else if (error.includes("Email or username already exists")) {
        message.error({ content: t("emailOrUsernameExists"), key: errorKey });
      } else {
        message.error({ content: t(error) || error, key: errorKey });
      }
      // Clear the error after displaying it
      dispatch(clearError());
    } else {
      lastErrorMessageRef.current = null;
    }
  }, [error, t, dispatch]);

  const handleLogin = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result) {
        // Show welcome back message if user has logged in before
        const lastLogin = localStorage.getItem("lastLogin");
        if (lastLogin) {
          message.success(t("welcomeBack"));
        } else {
          message.success(t("successLogin"));
        }
        localStorage.setItem("lastLogin", new Date().toISOString());
        navigate("/");
      }
    } catch (error) {
      // Error is handled in the error effect
      throw error;
    }
  };

  const handleSignup = async (email, password, username) => {
    const result = await dispatch(
      register({ email, password, username }),
    ).unwrap();
    if (result) {
      message.success(t("successCreate"));
      return result;
    }
  };

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    message.success(t("successLogout"));
    navigate("/login");
  };

  const handleGetUserByEmail = async (email) => {
    try {
      const result = await dispatch(getUserByEmail(email)).unwrap();
      console.log("User by email:", result); // Log kết quả ra console
      return result;
    } catch (error) {
      console.log("Không tìm thấy user:", error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    checkToken,
    getUserByEmail: handleGetUserByEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      context?.t("errorUseAuth") ||
        "useAuth must be used within an AuthProvider",
    );
  }
  return context;
};
