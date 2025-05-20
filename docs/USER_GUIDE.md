# 用户手册

## 1. 安装指南

### 1.1 环境准备

- Node.js 16+
- Yarn 1.22+
- Git

### 1.2 获取代码

```bash
git clone <repository-url>
cd micro-frontend-project
```

### 1.3 安装依赖

```bash
# 主应用
cd host && yarn install

# 远程模块
cd ../remote && yarn install
```

## 2. 运行配置

### 2.1 开发模式

```bash
# 主应用
cd host && yarn start

# 远程模块 (新终端)
cd ../remote && yarn start
```

### 2.2 生产构建

```bash
# 主应用
cd host && yarn build

# 远程模块
cd ../remote && yarn build
```

## 3. 使用教程

### 3.1 模块管理

1. 访问主应用界面(http://localhost:3000)
2. 通过导航菜单切换不同模块
3. 查看模块加载状态

### 3.2 主题切换

1. 点击右上角主题切换按钮
2. 选择亮色/暗色主题
3. 观察界面样式变化

### 3.3 多语言切换

1. 点击语言选择器
2. 选择目标语言
3. 界面内容将自动切换

## 4. 常见问题

### 4.1 模块加载失败

- 检查网络连接
- 确认远程模块服务已启动
- 查看浏览器控制台错误信息

### 4.2 样式异常

- 清除浏览器缓存
- 检查模块 CSS 是否正常加载
- 确认没有样式冲突

### 4.3 状态不同步

- 刷新页面
- 检查 Redux DevTools 状态
- 确认通信事件正常触发
