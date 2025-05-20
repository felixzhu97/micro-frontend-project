# API 文档

## 主应用 API

### 模块注册

```typescript
interface ModuleConfig {
  name: string;
  url: string;
  scope: string;
  module: string;
  // 高级配置
  prefetch?: boolean; // 是否预加载
  sandbox?: boolean; // 是否启用沙箱
  retryPolicy?: {
    // 重试策略
    maxRetries: number;
    retryDelay: number;
  };
}

function registerModule(config: ModuleConfig): Promise<void>;

// 高级用法示例
const advancedConfig = {
  name: "todo-module",
  url: "https://cdn.example.com/todo/1.2.3/remoteEntry.js",
  scope: "todo",
  module: "./TodoApp",
  prefetch: true,
  sandbox: true,
  retryPolicy: {
    maxRetries: 3,
    retryDelay: 1000,
  },
};
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

// 状态同步策略
interface ThemeSyncOptions {
  debounceTime?: number; // 防抖时间(ms)
  persistence?: {
    key: string; // localStorage键名
    version: number; // 数据版本
  };
  broadcast?: boolean; // 是否广播到其他窗口
}

// 最佳实践示例
const themeSyncConfig: ThemeSyncOptions = {
  debounceTime: 300,
  persistence: {
    key: "app_theme",
    version: 1,
  },
  broadcast: true,
};
```

### Todo 状态

```typescript
interface TodoState {
  items: TodoItem[];
  loading: boolean;
  lastUpdated?: number; // 最后更新时间戳
  version: string; // 数据版本
}

// 性能优化策略
interface TodoOptimization {
  batchUpdates: boolean; // 是否启用批量更新
  optimisticUpdates: boolean; // 是否启用乐观更新
  maxBatchSize?: number; // 最大批量大小
}

// 错误处理机制
interface TodoErrorHandling {
  retryCount: number;
  fallbackState?: TodoItem[]; // 降级状态
  error?: {
    message: string;
    code: string;
  };
}

// 最佳实践配置
const todoConfig = {
  optimization: {
    batchUpdates: true,
    optimisticUpdates: true,
    maxBatchSize: 10,
  },
  errorHandling: {
    retryCount: 3,
    fallbackState: [],
  },
};
```
