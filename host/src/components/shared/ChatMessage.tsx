import React from "react";
import styled from "styled-components";
import { ChatMessage as ChatMessageType } from "../../stores/useChatStore";

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme, isUser }) =>
    isUser
      ? theme.colors.primary
      : theme.colors.surface || theme.colors.background};
  color: ${({ theme, isUser }) =>
    isUser ? theme.colors.background : theme.colors.text};
  word-wrap: break-word;
  box-shadow: ${({ theme }) =>
    theme.shadows?.small || "0 1px 3px rgba(0, 0, 0, 0.1)"};
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
`;

const MessageContent = styled.div`
  line-height: 1.5;
  white-space: pre-wrap;
`;

const Avatar = styled.div<{ isUser: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme, isUser }) =>
    isUser ? theme.colors.primary : theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin: ${({ isUser }) => (isUser ? "0 0 0 8px" : "0 8px 0 0")};
  flex-shrink: 0;
`;

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <MessageContainer isUser={isUser}>
      {!isUser && <Avatar isUser={false}>AI</Avatar>}
      <MessageBubble isUser={isUser}>
        <MessageInfo>
          <span>{isUser ? "我" : "DeepSeek"}</span>
          <span>{formatTime(message.timestamp)}</span>
        </MessageInfo>
        <MessageContent>{message.content}</MessageContent>
      </MessageBubble>
      {isUser && <Avatar isUser={true}>我</Avatar>}
    </MessageContainer>
  );
};

export default ChatMessage;
