import React, { useMemo } from "react";
import { AppContext } from "./AppProvider";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";

const AppContextProvider = ({ children }) => {
  const theme = useTheme();
  const language = useLanguage();

  const value = useMemo(
    () => ({
      theme,
      language,
    }),
    [theme, language],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
