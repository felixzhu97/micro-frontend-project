# API 文档

## 主应用 API

### 模块注册

```typescript
interface ModuleConfig {
  name: string;
  url: string;
  scope: string;
  module: string;
}

function registerModule(config: ModuleConfig): Promise<void>;
```

### 主题切换

```typescript
function toggleTheme(theme: "light" | "dark"): void;
```

## 远程模块 API

### TodoList 组件

```typescript
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
}
```

### Counter 组件

```typescript
interface CounterProps {
  initialValue?: number;
  onChange?: (value: number) => void;
}
```

## 共享状态

### 主题状态

```typescript
interface ThemeState {
  current: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
  };
}
```

### Todo 状态

```typescript
interface TodoState {
  items: TodoItem[];
  loading: boolean;
}
```
