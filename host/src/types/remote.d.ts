/// <reference types="react" />

declare module "remote/Button" {
  const Button: React.ComponentType<{
    onClick?: () => void;
    children?: React.ReactNode;
  }>;
  export default Button;
}

declare module "remote/TodoList" {
  export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  const TodoList: React.ComponentType;
  export default TodoList;
}

declare module "remote/Counter" {
  const Counter: React.ComponentType;
  export default Counter;
}

declare module "*.json" {
  const value: any;
  export default value;
}
