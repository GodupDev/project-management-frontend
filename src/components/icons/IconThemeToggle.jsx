import { useTheme } from "../../context/ThemeContext";

const IconThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    console.log("Current theme:", theme);
    toggleTheme();
    console.log("Theme toggled to:", theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-lg bg-[var(--color-background-elevated)] 
                 hover:bg-[var(--color-action-hover)]
                 text-[var(--color-text-secondary)]
                 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-opacity-50
                 active:bg-[var(--color-action-selected)]
                 shadow-[var(--shadow-sm)] cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        // Moon icon for dark mode
        <svg
          className="w-5 h-5 text-[var(--color-text-primary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          className="w-5 h-5 text-[var(--color-primary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default IconThemeToggle;
