import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { useMockData } from "./MockDataContext";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { useUserProfile } from "./UserProfileContext";

// Custom hook để sử dụng tất cả contexts
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Export các hooks riêng lẻ
export {
  useTheme,
  useSidebar,
  useMockData,
  useLanguage,
  useAuth,
  useUserProfile,
};
