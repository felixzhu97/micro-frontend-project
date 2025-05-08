# 微前端项目

这是一个由主应用和远程模块组成的微前端项目。

## 项目结构

```
├── host/                # 主应用
│   ├── public/          # 静态资源
│   ├── src/             # 应用源代码
│   ├── package.json     # 主应用依赖
│   └── webpack.config.js # 主应用webpack配置
├── remote/              # 远程模块
│   ├── public/          # 静态资源
│   ├── src/             # 模块源代码
│   ├── package.json     # 远程模块依赖
│   └── webpack.config.js # 远程模块webpack配置
├── docs/                # 项目文档
│   ├── architecture/    # 架构文档
│   │   ├── c4_context.puml  # 系统上下文图
│   │   ├── c4_container.puml # 容器图
│   │   ├── c4_component.puml # 组件图
│   │   └── c4_code.puml     # 代码图
│   ├── API.md          # API文档
│   ├── CONTRIBUTING.md # 贡献指南
│   └── DEVELOPMENT.md  # 开发指南
```

## 使用技术

- React + TypeScript
- Webpack Module Federation
- i18n 国际化支持
- Redux Toolkit 状态管理
- Styled Components 样式组件

## 架构图查看

1. 安装 PlantUML 插件到 VS Code 或 IntelliJ IDEA
2. 打开对应的.puml 文件
3. 使用插件渲染架构图

## 快速开始

1. 安装依赖(主应用和远程模块都需要):

```bash
cd host && yarn install
cd ../remote && yarn install
```

2. 启动开发服务器:

```bash
# 在不同终端分别执行
cd host && yarn start
cd ../remote && yarn start
```

3. 访问应用:

- 主应用: http://localhost:3000
- 远程模块: http://localhost:3001

## 构建与部署

生产环境构建:

```bash
cd host && yarn build
cd ../remote && yarn build
```

构建产物将输出到各自的`dist`目录。
