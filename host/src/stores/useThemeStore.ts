import { create } from "zustand";

interface ThemeState {
  mode: "light" | "dark";
  primary: string;
  secondary: string;
}

interface ThemeActions {
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>((set) => ({
  // 初始状态
  mode: "light",
  primary: "#007bff",
  secondary: "#6c757d",

  // Actions
  toggleTheme: () => {
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      return {
        mode: newMode,
        primary: newMode === "dark" ? "#0056b3" : "#007bff",
        secondary: newMode === "dark" ? "#495057" : "#6c757d",
      };
    });
  },

  setPrimaryColor: (color: string) => {
    set({ primary: color });
  },

  setSecondaryColor: (color: string) => {
    set({ secondary: color });
  },
}));
