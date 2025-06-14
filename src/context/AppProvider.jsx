import React, { createContext } from "react";
import { ThemeProvider } from "./ThemeContext";
import { SidebarProvider } from "./SidebarContext";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import { UserProfileProvider } from "./UserProfileContext";
import { ProjectProvider } from "./ProjectContext";
import { SearchProvider } from "./SearchContext";
import AppContextProvider from "./AppContextProvider";

// Tạo một context chung cho toàn bộ ứng dụng
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext({
  theme: null,
  language: null,
});

// Tạo một Provider component kết hợp tất cả providers
const AppProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <UserProfileProvider>
            <ProjectProvider>
              <SearchProvider>
                <SidebarProvider>
                  <AppContextProvider>{children}</AppContextProvider>
                </SidebarProvider>
              </SearchProvider>
            </ProjectProvider>
          </UserProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
