import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { setApiKey } from "../../store/chatSlice";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";

const SettingsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ApiKeyInput = styled(Input)`
  flex: 1;
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
  margin: 0;
  line-height: 1.4;
`;

const ValidationError = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => `${theme.colors.error}15`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => `${theme.colors.success}15`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-left: 3px solid ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const StatusIndicator = styled.div<{ hasApiKey: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  color: ${({ theme, hasApiKey }) =>
    hasApiKey ? theme.colors.success : theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, hasApiKey }) =>
      hasApiKey ? theme.colors.success : theme.colors.warning};
  }
`;

const ApiKeySettings: React.FC = () => {
  const dispatch = useDispatch();
  const { apiKey } = useSelector((state: RootState) => state.chat);
  const [inputValue, setInputValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setInputValue(apiKey);
    }
  }, [apiKey]);

  const validateApiKey = (key: string) => {
    if (!key.trim()) {
      return "API Key 不能为空";
    }
    if (!key.startsWith("sk-")) {
      return 'API Key 格式错误，应该以 "sk-" 开头';
    }
    if (key.length < 20) {
      return "API Key 长度不足，请检查是否完整复制";
    }
    return "";
  };

  const handleSave = () => {
    const trimmedKey = inputValue.trim();
    const error = validateApiKey(trimmedKey);

    if (error) {
      setValidationError(error);
      setShowSuccess(false);
      return;
    }

    setValidationError("");
    dispatch(setApiKey(trimmedKey));
    setShowSuccess(true);

    // 3秒后隐藏成功消息
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 清除验证错误和成功消息
    if (validationError) {
      setValidationError("");
    }
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 4)}${"*".repeat(key.length - 8)}${key.substring(
      key.length - 4
    )}`;
  };

  return (
    <SettingsContainer>
      <Card title="DeepSeek API 设置">
        <StatusIndicator hasApiKey={!!apiKey}>
          {apiKey ? "API Key 已配置" : "API Key 未配置"}
        </StatusIndicator>

        <InputGroup>
          <ApiKeyInput
            type={showKey ? "text" : "password"}
            value={
              showKey
                ? inputValue
                : apiKey
                ? maskApiKey(inputValue)
                : inputValue
            }
            onChange={handleInputChange}
            placeholder="请输入 DeepSeek API Key (格式: sk-...)"
            onFocus={() => setShowKey(true)}
            onBlur={() => setShowKey(false)}
          />
          <Button onClick={handleSave} variant="primary">
            保存
          </Button>
        </InputGroup>

        {validationError && (
          <ValidationError>
            <span>⚠️</span>
            <span>{validationError}</span>
          </ValidationError>
        )}

        {showSuccess && (
          <SuccessMessage>
            <span>✅</span>
            <span>API Key 保存成功！现在可以开始聊天了</span>
          </SuccessMessage>
        )}

        <HelpText>
          请访问{" "}
          <a
            href="https://platform.deepseek.com/api_keys"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            DeepSeek 官网
          </a>{" "}
          获取 API Key。API Key 格式为
          "sk-xxx..."，将安全保存在浏览器本地存储中。
        </HelpText>
      </Card>
    </SettingsContainer>
  );
};

export default ApiKeySettings;
