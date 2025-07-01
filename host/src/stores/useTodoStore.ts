import { create } from "zustand";
import { storage } from "../utils";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  filter: "all" | "active" | "completed";
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set) => ({
  // 初始状态
  items: storage.get<Todo[]>("todos") || [],
  filter: "all",

  // Actions
  addTodo: (text: string) => {
    set((state) => {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      const newItems = [...state.items, newTodo];
      storage.set("todos", newItems);
      return { items: newItems };
    });
  },

  toggleTodo: (id: number) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      storage.set("todos", newItems);
      return { items: newItems };
    });
  },

  removeTodo: (id: number) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      storage.set("todos", newItems);
      return { items: newItems };
    });
  },

  setFilter: (filter: "all" | "active" | "completed") => {
    set({ filter });
  },
}));
