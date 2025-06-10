import React, { useMemo } from "react";
import { AppContext } from "./AppProvider";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { useMockData } from "./MockDataContext";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { useUserProfile } from "./UserProfileContext";

const AppContextProvider = ({ children }) => {
  const theme = useTheme();
  const sidebar = useSidebar();
  const mockData = useMockData();
  const language = useLanguage();
  const auth = useAuth();
  const userProfile = useUserProfile();

  const value = useMemo(
    () => ({
      theme,
      sidebar,
      mockData,
      language,
      auth,
      userProfile,
    }),
    [theme, sidebar, mockData, language, auth, userProfile],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
