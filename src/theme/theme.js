export const theme = {
  light: {
    colors: {
      primary: {
        main: "#2563eb", // blue-600
        light: "#60a5fa", // blue-400
        dark: "#1d4ed8", // blue-700
        contrast: "#ffffff",
      },
      background: {
        default: "#f8fafc", // slate-50
        paper: "#ffffff",
        elevated: "#f1f5f9", // slate-100
      },
      text: {
        primary: "#0f172a", // slate-900
        secondary: "#475569", // slate-600
        disabled: "#94a3b8", // slate-400
      },
      border: {
        light: "#e2e8f0", // slate-200
        main: "#cbd5e1", // slate-300
      },
      action: {
        hover: "rgba(0, 0, 0, 0.04)",
        selected: "rgba(0, 0, 0, 0.08)",
        disabled: "rgba(0, 0, 0, 0.26)",
      },
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
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
        light: "#334155", // slate-700
        main: "#475569", // slate-600
      },
      action: {
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
        disabled: "rgba(255, 255, 255, 0.3)",
      },
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.4)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.4)",
    },
  },
};
