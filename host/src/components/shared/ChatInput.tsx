import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const ChatInputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid
    ${({ theme }) => theme.colors.border || theme.colors.secondary};
  background-color: ${({ theme }) =>
    theme.colors.surface || theme.colors.background};
`;

const MessageInput = styled(Input)`
  flex: 1;
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "请输入消息...",
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ChatInputContainer>
        <MessageInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || !message.trim()}
        >
          发送
        </Button>
      </ChatInputContainer>
    </form>
  );
};

export default ChatInput;
