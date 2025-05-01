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
};

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    background: "#ffffff",
    text: "#000000",
    primary: "#007bff",
    secondary: "#6c757d",
    error: "#dc3545",
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
  },
  ...baseTheme,
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    background: "#1a1a1a",
    text: "#ffffff",
    primary: "#0056b3",
    secondary: "#495057",
    error: "#dc3545",
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
  },
  ...baseTheme,
};
