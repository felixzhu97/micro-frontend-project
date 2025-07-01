import { create } from "zustand";
import axios from "axios";
import { storage, SecurityUtils } from "../utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  apiKey: string | null;
}

interface ChatActions {
  addUserMessage: (content: string) => void;
  setApiKey: (key: string) => void;
  clearMessages: () => void;
  clearError: () => void;
  sendMessage: (message: string, apiKey: string) => Promise<void>;
}

type ChatStore = ChatState & ChatActions;

// 创建限流器，每分钟最多10个请求
const rateLimiter = SecurityUtils.createRateLimiter(10, 60 * 1000);

export const useChatStore = create<ChatStore>((set, get) => ({
  // 初始状态 - 优先使用加密存储
  messages: [],
  isLoading: false,
  error: null,
  apiKey:
    storage.getSecure("deepseek_api_key") ||
    localStorage.getItem("deepseek_api_key"),

  // Actions
  addUserMessage: (content: string) => {
    // 验证用户输入
    const validation = SecurityUtils.validateUserInput(content);
    if (!validation.isValid) {
      set({ error: validation.error });
      return;
    }

    // 对用户输入进行清理（防XSS）
    const sanitizedContent = SecurityUtils.sanitizeText(content);

    const message: ChatMessage = {
      id: SecurityUtils.generateSecureId(),
      role: "user",
      content: sanitizedContent,
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setApiKey: (key: string) => {
    // 验证API Key格式
    if (!SecurityUtils.validateApiKey(key)) {
      set({ error: "API Key 格式无效" });
      return;
    }

    // 使用加密存储
    storage.setSecure("deepseek_api_key", key);
    set({ apiKey: key });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearError: () => {
    set({ error: null });
  },

  sendMessage: async (message: string, apiKey: string) => {
    // 检查限流
    if (!rateLimiter()) {
      set({ error: "请求过于频繁，请稍后重试" });
      return;
    }

    // 验证输入
    const validation = SecurityUtils.validateUserInput(message);
    if (!validation.isValid) {
      set({ error: validation.error });
      return;
    }

    // 验证API Key
    if (!SecurityUtils.validateApiKey(apiKey)) {
      set({ error: "API Key 格式无效，请重新配置" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      // 对消息进行清理
      const sanitizedMessage = SecurityUtils.sanitizeText(message);

      const response = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "你是一个有用的AI助手，请用中文回答用户的问题。",
            },
            {
              role: "user",
              content: sanitizedMessage,
            },
          ],
          stream: false,
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            // 添加安全头
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "X-XSS-Protection": "1; mode=block",
          },
          timeout: 30000, // 30秒超时
        }
      );

      // 对AI回复进行清理
      const aiResponseContent = SecurityUtils.sanitizeText(
        response.data.choices[0].message.content
      );

      const assistantMessage: ChatMessage = {
        id: SecurityUtils.generateSecureId(),
        role: "assistant",
        content: aiResponseContent,
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error: any) {
      // 不在控制台输出完整错误（可能包含敏感信息）
      console.warn("API请求失败");

      let errorMessage = "请求失败";

      // 处理不同类型的错误
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          errorMessage = "API Key 无效，请检查您的 API Key 是否正确";
        } else if (status === 403) {
          errorMessage = "API Key 权限不足或余额不足，请检查您的账户状态";
        } else if (status === 429) {
          errorMessage = "请求过于频繁，请稍后重试";
        } else if (status >= 500) {
          errorMessage = "DeepSeek 服务暂时不可用，请稍后重试";
        } else {
          errorMessage = "请求失败，请稍后重试";
        }
      } else if (error.request) {
        errorMessage = "网络连接失败，请检查您的网络连接";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "请求超时，请稍后重试";
      } else {
        errorMessage = "未知错误，请重试";
      }

      set({ error: errorMessage, isLoading: false });
    }
  },
}));
