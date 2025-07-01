import { create } from "zustand";
import axios from "axios";

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

export const useChatStore = create<ChatStore>((set, get) => ({
  // 初始状态
  messages: [],
  isLoading: false,
  error: null,
  apiKey: localStorage.getItem("deepseek_api_key"),

  // Actions
  addUserMessage: (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setApiKey: (key: string) => {
    localStorage.setItem("deepseek_api_key", key);
    set({ apiKey: key });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearError: () => {
    set({ error: null });
  },

  sendMessage: async (message: string, apiKey: string) => {
    set({ isLoading: true, error: null });

    try {
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
              content: message,
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
          },
        }
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data.choices[0].message.content,
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error("DeepSeek API Error:", error);

      let errorMessage = "请求失败";

      // 处理不同类型的错误
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 401) {
          errorMessage = "API Key 无效，请检查您的 API Key 是否正确";
        } else if (status === 403) {
          errorMessage = "API Key 权限不足或余额不足，请检查您的账户状态";
        } else if (status === 429) {
          errorMessage = "请求过于频繁，请稍后重试";
        } else if (status >= 500) {
          errorMessage = "DeepSeek 服务暂时不可用，请稍后重试";
        } else {
          // 尝试获取具体错误信息
          if (errorData) {
            if (typeof errorData === "string") {
              errorMessage = errorData;
            } else if (errorData.error) {
              if (typeof errorData.error === "string") {
                errorMessage = errorData.error;
              } else if (errorData.error.message) {
                errorMessage = errorData.error.message;
              }
            } else if (errorData.message) {
              errorMessage = errorData.message;
            }
          }
        }
      } else if (error.request) {
        errorMessage = "网络连接失败，请检查您的网络连接";
      } else {
        errorMessage = error.message || "未知错误，请重试";
      }

      set({ error: errorMessage, isLoading: false });
    }
  },
}));
