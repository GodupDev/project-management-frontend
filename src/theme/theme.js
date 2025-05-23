export const theme = {
  light: {
    colors: {
      primary: {
        main: "#1d4ed8", // blue-700
        light: "#3b82f6", // blue-500
        dark: "#1e40af", // blue-800
        contrast: "#ffffff",
      },
      background: {
        default: "#e5e7eb", // slate-200
        paper: "#ffffff", // white
        elevated: "#e2e8f0", // slate-200
      },
      text: {
        primary: "#0f172a", // slate-900
        secondary: "#334155", // slate-700
        disabled: "#94a3b8", // slate-400
      },
      border: {
        light: "#e2e8f0", // slate-200
        main: "#cbd5e1", // slate-300
      },
      action: {
        hover: "rgba(29, 78, 216, 0.08)", // light blue hover
        selected: "rgba(29, 78, 216, 0.12)", // stronger selected
        disabled: "rgba(100, 116, 139, 0.3)", // grayish
      },
    },
    shadows: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.15)",
    },
  },

  dark: {
    colors: {
      primary: {
        main: "#3b82f6", // blue-500
        light: "#60a5fa", // blue-400
        dark: "#2563eb", // blue-600
        contrast: "#ffffff",
      },
      background: {
        default: "#0f172a", // slate-900
        paper: "#1e293b", // slate-800
        elevated: "#334155", // slate-700
      },
      text: {
        primary: "#f8fafc", // slate-50
        secondary: "#cbd5e1", // slate-300
        disabled: "#64748b", // slate-500
      },
      border: {
        light: "#475569", // slate-600
        main: "#64748b", // slate-500
      },
      action: {
        hover: "rgba(96, 165, 250, 0.08)", // soft blue
        selected: "rgba(96, 165, 250, 0.16)", // deeper blue
        disabled: "rgba(148, 163, 184, 0.3)", // slate-400
      },
    },
    shadows: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
    },
  },
};
