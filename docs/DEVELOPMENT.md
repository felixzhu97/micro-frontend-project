# 开发指南

## 环境要求

- Node.js 16+
- Yarn 1.22+
- TypeScript 4.5+

## 开发流程

1. 克隆仓库

```bash
git clone <仓库地址>
```

2. 安装依赖

```bash
yarn install
```

3. 启动开发服务器

```bash
yarn start
```

## 代码规范

- 使用 ESLint 进行代码检查
- 遵循 TypeScript 严格模式
- 组件使用函数式组件写法
- 状态管理使用 Redux Toolkit

## 测试

运行单元测试：

```bash
yarn test
```

运行 E2E 测试：

```bash
yarn test:e2e
```
