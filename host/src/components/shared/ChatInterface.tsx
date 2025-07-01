import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useChatStore } from "../../stores/useChatStore";
import { SecurityUtils } from "../../utils";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ApiKeySettings from "./ApiKeySettings";
import PrivacySettings from "./PrivacySettings";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  border: 1px solid
    ${({ theme }) => theme.colors.border || theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
  background-color: ${({ theme }) =>
    theme.colors.surface || theme.colors.background};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  margin: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ErrorMessage = styled.div`
  flex: 1;
  line-height: 1.4;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SecurityIndicator = styled.div<{ isSecure: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme, isSecure }) =>
    isSecure ? `${theme.colors.success}15` : `${theme.colors.warning}15`};
  border-left: 3px solid
    ${({ theme, isSecure }) =>
      isSecure ? theme.colors.success : theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  color: ${({ theme, isSecure }) =>
    isSecure ? theme.colors.success : theme.colors.warning};

  &::before {
    content: "${({ isSecure }) => (isSecure ? "🔒" : "⚠️")}";
  }
`;

const SettingsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ChatInterface: React.FC = () => {
  const {
    messages,
    isLoading,
    error,
    apiKey,
    addUserMessage,
    sendMessage,
    clearError,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSecure = SecurityUtils.isSecureContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!apiKey) {
      return;
    }

    addUserMessage(message);
    try {
      await sendMessage(message, apiKey);
    } catch (error) {
      console.error("发送消息失败:", error);
    }
  };

  const handleClearError = () => {
    clearError();
  };

  const isApiKeyError = (errorMessage: string) => {
    return (
      errorMessage.includes("API Key") ||
      errorMessage.includes("401") ||
      errorMessage.includes("无效") ||
      errorMessage.includes("权限")
    );
  };

  const scrollToApiKeySettings = () => {
    const element = document.querySelector('[data-testid="api-key-settings"]');
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!apiKey) {
    return (
      <div>
        <SecurityIndicator isSecure={isSecure}>
          {isSecure ? "安全连接已启用" : "建议使用HTTPS连接以确保数据安全"}
        </SecurityIndicator>

        <SettingsSection>
          <div data-testid="api-key-settings">
            <ApiKeySettings />
          </div>
        </SettingsSection>

        <ChatContainer>
          <EmptyState>
            <EmptyStateIcon>🔑</EmptyStateIcon>
            <h3>请先配置 DeepSeek API Key</h3>
            <p>配置完成后即可开始与 DeepSeek AI 助手对话</p>
          </EmptyState>
        </ChatContainer>
        <PrivacySettings />
      </div>
    );
  }

  return (
    <div>
      <SecurityIndicator isSecure={isSecure}>
        {isSecure ? "安全连接已启用" : "建议使用HTTPS连接以确保数据安全"}
      </SecurityIndicator>

      <SettingsSection>
        <div data-testid="api-key-settings">
          <ApiKeySettings />
        </div>
      </SettingsSection>

      <ChatContainer>
        <MessagesContainer>
          {messages.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>💬</EmptyStateIcon>
              <h3>欢迎使用 DeepSeek 聊天助手</h3>
              <p>发送消息开始对话吧！</p>
            </EmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <LoadingContainer>
                  <LoadingSpinner />
                </LoadingContainer>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        {error && (
          <ErrorContainer>
            <ErrorMessage>
              <strong>⚠️ 发送失败</strong>
              <br />
              {error}
              {isApiKeyError(error) && (
                <>
                  <br />
                  <small>💡 请检查上方的 API Key 设置是否正确</small>
                </>
              )}
            </ErrorMessage>
            <ErrorActions>
              {isApiKeyError(error) && (
                <Button
                  onClick={scrollToApiKeySettings}
                  variant="secondary"
                  size="small"
                >
                  检查设置
                </Button>
              )}
              <Button
                onClick={handleClearError}
                variant="secondary"
                size="small"
              >
                关闭
              </Button>
            </ErrorActions>
          </ErrorContainer>
        )}

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading || !apiKey}
          placeholder="请输入您的问题..."
        />
      </ChatContainer>

      <PrivacySettings />
    </div>
  );
};

export default ChatInterface;
