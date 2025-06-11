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
      console.log(token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t(error));
    }
  }, [error, t]);

  const handleLogin = async (email, password) => {
    const result = await dispatch(login({ email, password })).unwrap();
    if (result) {
      message.success(t("successLogin"));
      navigate("/");
    }
  };

  const handleSignup = async (email, password, username) => {
    const result = await dispatch(
      register({ email, password, username }),
    ).unwrap();
    if (result) {
      message.success(t("successCreate"));
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
    message.success(t("successLogout"));
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
    throw new Error(
      context?.t("errorUseAuth") ||
        "useAuth must be used within an AuthProvider",
    );
  }
  return context;
};
