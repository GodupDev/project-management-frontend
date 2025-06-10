import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useLanguage } from "./LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  register,
  getCurrentUser,
} from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  // Check for token and fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCurrentUser());
    }
    console.log(token);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleLogin = async (email, password) => {
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result) {
        console.log("Login successful, user data:", result.data);
        message.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  const handleSignup = async (email, password, username) => {
    try {
      const result = await dispatch(
        register({ email, password, username }),
      ).unwrap();
      if (result) {
        console.log("Signup successful, user data:", result.data);
        message.success("Đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      console.log("User logged out");
      navigate("/login");
      message.success("Đăng xuất thành công");
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
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
