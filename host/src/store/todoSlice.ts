import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "remote/TodoList";
import { storage } from "../utils";

interface TodoState {
  items: Todo[];
  filter: "all" | "active" | "completed";
}

const initialState: TodoState = {
  items: storage.get<Todo[]>("todos") || [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
      storage.set("todos", state.items);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        storage.set("todos", state.items);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.set("todos", state.items);
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
