# 🚀 DeepSeek 聊天助手 - 企业级微前端项目

基于 **Module Federation** 的现代化微前端项目，集成 **DeepSeek AI** 聊天助手，具备**企业级安全**和**隐私保护**功能。

## ✨ 功能特点

### 🎯 核心功能

- **🏗️ 微前端架构**: 基于 Webpack Module Federation 的模块化架构
- **🤖 DeepSeek AI 聊天**: 集成 DeepSeek API 的智能对话系统
- **🔒 企业级安全**: 加密存储、输入验证、XSS 防护、限流保护
- **🛡️ 隐私保护**: 完整的数据控制、透明的存储管理
- **🌍 国际化支持**: 中英文无缝切换
- **🎨 主题系统**: 明暗主题动态切换
- **📱 响应式设计**: 适配所有设备尺寸

### 🔐 安全特性

- **API Key 加密存储**: XOR 加密算法本地安全存储
- **输入安全验证**: XSS 防护、内容过滤、格式验证
- **网络请求保护**: 安全头、超时保护、错误脱敏
- **访问控制**: 智能限流、会话管理、防抖保护
- **内容安全策略**: CSP 配置、HTTPS 强制、安全指示器

### 🎛️ 隐私控制

- **数据透明度**: 实时显示存储使用情况
- **用户控制**: 聊天记录清理、API Key 管理、数据导出
- **过期管理**: 自动清理过期数据、存储优化
- **确认保护**: 敏感操作二次确认机制

## 🛠 技术栈

### 前端技术

- **框架**: React 18 + TypeScript 5.0
- **状态管理**: Zustand 5.0 (轻量级、类型安全)
- **样式方案**: Styled Components 5.3
- **构建工具**: Webpack 5 + Module Federation
- **国际化**: i18next + react-i18next
- **HTTP 客户端**: Axios (增强安全配置)

### 安全技术

- **加密算法**: 自定义 XOR 加密 + 随机盐值
- **安全验证**: 多层输入验证、API Key 格式检查
- **网络安全**: CSP、安全头、HTTPS 强制
- **隐私保护**: 数据最小化、用户控制、透明存储

## 📦 项目架构

```
micro-frontend-project/
├── host/                           # 🏠 主应用 (端口: 3000)
│   ├── src/
│   │   ├── components/shared/      # 共享组件
│   │   │   ├── ChatInterface.tsx       # 主聊天界面
│   │   │   ├── ChatMessage.tsx         # 消息气泡组件
│   │   │   ├── ChatInput.tsx           # 输入组件
│   │   │   ├── ApiKeySettings.tsx      # API Key 设置
│   │   │   └── PrivacySettings.tsx     # 🆕 隐私设置面板
│   │   ├── stores/                 # Zustand 状态管理
│   │   │   ├── useChatStore.ts         # 聊天状态 + 安全验证
│   │   │   ├── useThemeStore.ts        # 主题状态
│   │   │   └── useTodoStore.ts         # 待办状态
│   │   ├── utils/                  # 🆕 安全工具模块
│   │   │   ├── crypto.ts               # 加密工具
│   │   │   ├── security.ts             # 安全验证
│   │   │   └── index.ts                # 增强存储
│   │   ├── i18n/                   # 国际化配置
│   │   └── styles/                 # 主题样式
├── remote/                         # 🔗 远程应用 (端口: 3001)
│   ├── src/components/
│   │   ├── ChatAssistant.tsx           # 远程聊天组件
│   │   ├── TodoList.tsx               # 待办组件
│   │   └── Counter.tsx                # 计数器组件
└── public/locales/                 # 国际化资源
    ├── zh-CN/translation.json         # 中文翻译
    └── en-US/translation.json         # 英文翻译
```

## 🚀 快速开始

### 1️⃣ 环境准备

```bash
# 克隆项目
git clone <repository-url>
cd micro-frontend-project

# 安装依赖
npm install
# 或者分别安装
cd host && npm install
cd ../remote && npm install
```

### 2️⃣ 获取 API Key

1. 访问 [DeepSeek Platform](https://platform.deepseek.com/api_keys)
2. 注册账号并创建 API Key
3. 复制格式为 `sk-...` 的 API Key

### 3️⃣ 启动应用

```bash
# 🎯 启动完整项目 (推荐)
npm start

# 或分别启动
npm run start:host    # 主应用: http://localhost:3000
npm run start:remote  # 远程应用: http://localhost:3001
```

### 4️⃣ 配置与使用

1. **访问应用**: http://localhost:3000
2. **进入聊天**: 点击 "AI 聊天" 导航
3. **配置 API Key**: 在设置面板输入并保存
4. **开始对话**: 享受智能聊天体验！

## 📖 功能指南

### 🤖 聊天功能

| 功能             | 路径           | 描述                           |
| ---------------- | -------------- | ------------------------------ |
| **主聊天界面**   | `/chat`        | 完整 DeepSeek 集成，支持长对话 |
| **远程聊天演示** | `/remote-chat` | 微前端组件演示                 |
| **API 设置**     | -              | 安全的 API Key 配置            |
| **聊天记录**     | -              | 内存存储，支持清理             |

### 🔐 安全与隐私

| 功能           | 描述                        | 位置         |
| -------------- | --------------------------- | ------------ |
| **加密存储**   | API Key 自动加密保存        | 后台自动     |
| **安全指示器** | 实时显示连接安全状态        | 聊天页面顶部 |
| **隐私面板**   | 完整的数据控制选项          | 聊天页面下方 |
| **数据清理**   | 聊天记录、API Key、全部数据 | 隐私设置     |
| **存储透明度** | 显示本地存储使用情况        | 隐私设置     |

### 🎨 个性化

- **主题切换**: 右上角主题按钮，明暗模式切换
- **语言切换**: 右上角语言选择器，中英文切换
- **响应式布局**: 自动适配桌面、平板、手机

## 🔧 配置详情

### API 配置

```typescript
// DeepSeek API 配置
endpoint: "https://api.deepseek.com/v1/chat/completions"
model: "deepseek-chat"
max_tokens: 1000
temperature: 0.7
timeout: 30000ms
```

### 安全配置

```typescript
// 安全策略
encryption: "XOR + Salt";
session_timeout: "24 hours";
rate_limit: "10 requests/minute";
input_max_length: "2000 characters";
```

### 环境变量

```bash
NODE_ENV=development          # 开发/生产模式
CSP_NONCE=<random>           # 内容安全策略随机数
HTTPS=true                   # 生产环境强制 HTTPS
```

## 🏗 构建部署

### 开发构建

```bash
npm run build:dev    # 开发构建
npm run build        # 生产构建
npm run serve        # 预览构建结果
```

### 部署选项

| 平台        | 配置           | 说明             |
| ----------- | -------------- | ---------------- |
| **Vercel**  | `vercel.json`  | 自动部署，零配置 |
| **Netlify** | `netlify.toml` | 静态站点部署     |
| **Docker**  | `Dockerfile`   | 容器化部署       |
| **CDN**     | `dist/`        | 静态资源分发     |

## 🛡️ 安全最佳实践

### 开发者指南

1. **API Key 管理**

   - 从不在代码中硬编码 API Key
   - 定期轮换 API Key
   - 使用环境变量管理敏感配置

2. **数据保护**

   - 最小化数据收集
   - 加密敏感信息
   - 定期清理过期数据

3. **网络安全**
   - 始终使用 HTTPS
   - 验证所有用户输入
   - 实施适当的 CSP 策略

### 用户指南

1. **隐私保护**

   - 定期清理聊天记录
   - 不要分享 API Key
   - 使用隐私设置管理数据

2. **安全使用**
   - 注意安全指示器状态
   - 使用强网络连接
   - 定期检查存储使用情况

## 📊 性能指标

| 指标                       | 开发环境 | 生产环境 |
| -------------------------- | -------- | -------- |
| **First Contentful Paint** | < 1.5s   | < 1.0s   |
| **Time to Interactive**    | < 3.0s   | < 2.0s   |
| **Bundle Size (gzipped)**  | ~400KB   | ~300KB   |
| **Memory Usage**           | < 50MB   | < 30MB   |

## 🧪 测试策略

```bash
npm run test          # 单元测试
npm run test:e2e      # 端到端测试
npm run test:security # 安全测试
npm run test:coverage # 覆盖率报告
```

## 🔄 版本历史

| 版本       | 日期    | 主要更新                                  |
| ---------- | ------- | ----------------------------------------- |
| **v2.0.0** | 2025-01 | 🆕 企业级安全功能、隐私保护、Zustand 迁移 |
| **v1.5.0** | 2024-12 | DeepSeek API 集成、聊天功能               |
| **v1.0.0** | 2024-11 | 基础微前端架构、组件库                    |

## 🤝 贡献指南

### 开发流程

1. **Fork** 项目并创建功能分支
2. **开发** 新功能，遵循代码规范
3. **测试** 确保所有测试通过
4. **文档** 更新相关文档
5. **提交** Pull Request

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint + Prettier 配置
- 编写单元测试和类型定义
- 提供清晰的提交信息

## 📄 许可与支持

- **许可证**: MIT License
- **支持**: [GitHub Issues](https://github.com/your-repo/issues)
- **讨论**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **文档**: [项目 Wiki](https://github.com/your-repo/wiki)

## 🔗 相关资源

### 官方文档

- [DeepSeek Platform](https://platform.deepseek.com/)
- [DeepSeek API 文档](https://platform.deepseek.com/api-docs/)
- [Module Federation 指南](https://webpack.js.org/concepts/module-federation/)

### 社区资源

- [React 官方文档](https://react.dev/)
- [Zustand 文档](https://docs.pmnd.rs/zustand/)
- [Styled Components](https://styled-components.com/)

---

🌟 **如果这个项目对您有帮助，请给个 Star！**

📧 **问题反馈**: [提交 Issue](https://github.com/your-repo/issues)  
💬 **功能建议**: [参与讨论](https://github.com/your-repo/discussions)
