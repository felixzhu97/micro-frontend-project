import { DefaultTheme } from "styled-components";

const baseTheme = {
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  typography: {
    fontSize: {
      small: "12px",
      medium: "14px",
      large: "16px",
      xlarge: "20px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    large: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
};

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    background: "#ffffff",
    text: "#000000",
    textSecondary: "#6c757d",
    primary: "#007bff",
    secondary: "#6c757d",
    error: "#dc3545",
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
    border: "#dee2e6",
    surface: "#f8f9fa",
  },
  ...baseTheme,
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    background: "#1a1a1a",
    text: "#ffffff",
    textSecondary: "#adb5bd",
    primary: "#0056b3",
    secondary: "#495057",
    error: "#dc3545",
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
    border: "#495057",
    surface: "#343a40",
  },
  ...baseTheme,
};
