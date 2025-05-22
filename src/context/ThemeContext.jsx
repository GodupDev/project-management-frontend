import { createContext, useContext, useEffect, useState } from "react";
import { theme } from "../theme/theme";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(currentTheme);

    // Apply theme colors to CSS variables
    const currentThemeConfig = theme[currentTheme];
    Object.entries(currentThemeConfig.colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(`--color-${category}-${key}`, value);
      });
    });

    // Apply theme shadows
    Object.entries(currentThemeConfig.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }, [currentTheme]);

  const value = {
    theme: currentTheme,
    toggleTheme,
    themeConfig: theme[currentTheme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
