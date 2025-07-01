/// <reference types="react" />

declare module "remote/Button" {
  const Button: React.ComponentType;
  export default Button;
}

declare module "remote/TodoList" {
  const TodoList: React.ComponentType;
  export default TodoList;
}

declare module "remote/Counter" {
  const Counter: React.ComponentType;
  export default Counter;
}

declare module "remote/ChatAssistant" {
  const ChatAssistant: React.ComponentType;
  export default ChatAssistant;
}

declare module "*.json" {
  const value: any;
  export default value;
}
