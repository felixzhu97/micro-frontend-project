import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  primary: string;
  secondary: string;
}

const initialState: ThemeState = {
  mode: "light",
  primary: "#007bff",
  secondary: "#6c757d",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (state.mode === "dark") {
        state.primary = "#0056b3";
        state.secondary = "#495057";
      } else {
        state.primary = "#007bff";
        state.secondary = "#6c757d";
      }
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primary = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondary = action.payload;
    },
  },
});

export const { toggleTheme, setPrimaryColor, setSecondaryColor } =
  themeSlice.actions;
export default themeSlice.reducer;
