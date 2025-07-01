import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import todoReducer from "./todoSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todo: todoReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
