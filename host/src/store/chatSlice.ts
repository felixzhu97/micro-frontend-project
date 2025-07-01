import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  apiKey: string | null;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  apiKey: localStorage.getItem("deepseek_api_key"),
};

// DeepSeek API调用
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { message, apiKey }: { message: string; apiKey: string },
    { rejectWithValue }
  ) => {
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

      return {
        role: "assistant" as const,
        content: response.data.choices[0].message.content,
      };
    } catch (error: any) {
      console.error("DeepSeek API Error:", error);

      // 处理不同类型的错误
      if (error.response) {
        // API返回了错误响应
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 401) {
          return rejectWithValue("API Key 无效，请检查您的 API Key 是否正确");
        } else if (status === 403) {
          return rejectWithValue(
            "API Key 权限不足或余额不足，请检查您的账户状态"
          );
        } else if (status === 429) {
          return rejectWithValue("请求过于频繁，请稍后重试");
        } else if (status >= 500) {
          return rejectWithValue("DeepSeek 服务暂时不可用，请稍后重试");
        } else {
          // 尝试获取具体错误信息
          let errorMessage = "请求失败";
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
          return rejectWithValue(errorMessage);
        }
      } else if (error.request) {
        // 网络错误
        return rejectWithValue("网络连接失败，请检查您的网络连接");
      } else {
        // 其他错误
        return rejectWithValue(error.message || "未知错误，请重试");
      }
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: action.payload,
        timestamp: Date.now(),
      };
      state.messages.push(message);
    },
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
      localStorage.setItem("deepseek_api_key", action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          role: action.payload.role,
          content: action.payload.content,
          timestamp: Date.now(),
        };
        state.messages.push(assistantMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUserMessage, setApiKey, clearMessages, clearError } =
  chatSlice.actions;
export default chatSlice.reducer;
