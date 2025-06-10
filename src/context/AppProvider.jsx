import React, { createContext } from "react";
import { ThemeProvider } from "./ThemeContext";
import { SidebarProvider } from "./SidebarContext";
import { MockDataProvider } from "./MockDataContext";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import { UserProfileProvider } from "./UserProfileContext";
import AppContextProvider from "./AppContextProvider";

// Tạo một context chung cho toàn bộ ứng dụng
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

// Tạo một Provider component kết hợp tất cả providers
const AppProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <UserProfileProvider>
            <MockDataProvider>
              <SidebarProvider>
                <AppContextProvider>{children}</AppContextProvider>
              </SidebarProvider>
            </MockDataProvider>
          </UserProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
