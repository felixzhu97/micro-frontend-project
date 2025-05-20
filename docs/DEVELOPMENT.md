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

## 高级开发技巧

### 模块联邦配置

```javascript
// webpack.config.js 高级配置
module.exports = {
  // ...
  experiments: {
    topLevelAwait: true, // 启用顶级await
  },
  optimization: {
    chunkIds: "deterministic", // 稳定的chunk ID
    runtimeChunk: "single", // 提取运行时
  },
};
```

### 性能优化

- 使用动态导入实现懒加载
- 共享公共依赖(react, react-dom 等)
- 预加载关键模块
- 启用 gzip 压缩

### 调试技巧

1. 使用 window.**REMOTEDEV_TOOLS**扩展调试远程模块
2. 在主应用添加全局错误捕获：

```javascript
window.addEventListener('error', (e) => {
  console.log('Global error:', e);
});
3. 使用performance API测量模块加载时间
```
