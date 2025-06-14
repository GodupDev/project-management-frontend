import React, { useMemo } from "react";
import { AppContext } from "./AppProvider";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { useUserProfile } from "./UserProfileContext";

const AppContextProvider = ({ children }) => {
  const theme = useTheme();
  const sidebar = useSidebar();
  const language = useLanguage();
  const auth = useAuth();
  const userProfile = useUserProfile();

  const value = useMemo(
    () => ({
      theme,
      sidebar,
      language,
      auth,
      userProfile,
    }),
    [theme, sidebar, language, auth, userProfile],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
