import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useChatStore } from "../../stores/useChatStore";
import { storage, SecurityUtils } from "../../utils";
import Button from "./Button";
import Card from "./Card";

const SettingsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border || theme.colors.secondary}33;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "14px"};
`;

const SettingDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  line-height: 1.4;
`;

const ActionButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing.medium};
`;

const StorageInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) =>
    theme.colors.surface || theme.colors.background}44;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StorageText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
`;

const SecurityStatus = styled.div<{ isSecure: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme, isSecure }) =>
    isSecure ? theme.colors.success : theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.fontSize?.small || "12px"};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &::before {
    content: "${({ isSecure }) => (isSecure ? "🔒" : "⚠️")}";
  }
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.medium};
`;

const DialogTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.medium} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const DialogText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.large} 0;
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.secondary};
`;

const DialogActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  justify-content: flex-end;
`;

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <ConfirmationDialog onClick={onCancel}>
    <DialogContent onClick={(e) => e.stopPropagation()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogText>{message}</DialogText>
      <DialogActions>
        <Button variant="secondary" onClick={onCancel}>
          取消
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          确认
        </Button>
      </DialogActions>
    </DialogContent>
  </ConfirmationDialog>
);

const PrivacySettings: React.FC = () => {
  const { clearMessages } = useChatStore();
  const [storageInfo, setStorageInfo] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [isSecure] = useState(SecurityUtils.isSecureContext());

  useEffect(() => {
    updateStorageInfo();
  }, []);

  const updateStorageInfo = () => {
    const info = storage.getUsageInfo();
    setStorageInfo(info);
  };

  const handleClearMessages = () => {
    clearMessages();
    setShowConfirm(null);
    updateStorageInfo();
  };

  const handleClearApiKey = () => {
    storage.removeSecure("deepseek_api_key");
    // 强制刷新页面以清除内存中的API Key
    window.location.reload();
  };

  const handleClearAllData = () => {
    SecurityUtils.clearSensitiveData();
    clearMessages();
    setShowConfirm(null);
    updateStorageInfo();
    // 短暂延迟后刷新页面
    setTimeout(() => window.location.reload(), 100);
  };

  const handleCleanupExpired = () => {
    storage.cleanupExpired();
    setShowConfirm(null);
    updateStorageInfo();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SettingsContainer>
      <Card title="隐私与安全设置">
        <SecurityStatus isSecure={isSecure}>
          {isSecure ? "安全连接已启用" : "建议使用HTTPS连接"}
        </SecurityStatus>

        {storageInfo && (
          <StorageInfo>
            <StorageText>
              存储使用情况: {formatSize(storageInfo.totalSize * 2)}
              {storageInfo.encryptedSize > 0 &&
                ` (其中 ${formatSize(storageInfo.encryptedSize * 2)} 已加密)`}
            </StorageText>
            <StorageText>数据项数量: {storageInfo.itemCount}</StorageText>
          </StorageInfo>
        )}

        <SettingItem>
          <SettingInfo>
            <SettingTitle>清空聊天记录</SettingTitle>
            <SettingDescription>
              删除所有本地保存的聊天消息，但保留API Key设置
            </SettingDescription>
          </SettingInfo>
          <ActionButton
            variant="secondary"
            size="small"
            onClick={() => setShowConfirm("messages")}
          >
            清空
          </ActionButton>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingTitle>删除API Key</SettingTitle>
            <SettingDescription>
              移除本地存储的API Key，需要重新配置才能使用聊天功能
            </SettingDescription>
          </SettingInfo>
          <ActionButton
            variant="secondary"
            size="small"
            onClick={() => setShowConfirm("apikey")}
          >
            删除
          </ActionButton>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingTitle>清理过期数据</SettingTitle>
            <SettingDescription>
              删除所有过期的本地数据，释放存储空间
            </SettingDescription>
          </SettingInfo>
          <ActionButton
            variant="secondary"
            size="small"
            onClick={() => setShowConfirm("cleanup")}
          >
            清理
          </ActionButton>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingTitle>清除所有数据</SettingTitle>
            <SettingDescription>
              删除所有本地存储数据，包括API Key、聊天记录和应用设置
            </SettingDescription>
          </SettingInfo>
          <ActionButton
            variant="primary"
            size="small"
            onClick={() => setShowConfirm("all")}
          >
            全部清除
          </ActionButton>
        </SettingItem>

        {showConfirm === "messages" && (
          <ConfirmDialog
            title="确认清空聊天记录"
            message="此操作将删除所有聊天消息，但保留您的API Key设置。此操作不可撤销。"
            onConfirm={handleClearMessages}
            onCancel={() => setShowConfirm(null)}
          />
        )}

        {showConfirm === "apikey" && (
          <ConfirmDialog
            title="确认删除API Key"
            message="此操作将删除您的API Key，您需要重新配置才能继续使用聊天功能。"
            onConfirm={handleClearApiKey}
            onCancel={() => setShowConfirm(null)}
          />
        )}

        {showConfirm === "cleanup" && (
          <ConfirmDialog
            title="确认清理过期数据"
            message="此操作将删除所有过期的本地数据。正常数据不会受到影响。"
            onConfirm={handleCleanupExpired}
            onCancel={() => setShowConfirm(null)}
          />
        )}

        {showConfirm === "all" && (
          <ConfirmDialog
            title="确认清除所有数据"
            message="此操作将删除所有本地数据，包括API Key、聊天记录和应用设置。此操作不可撤销，应用将刷新。"
            onConfirm={handleClearAllData}
            onCancel={() => setShowConfirm(null)}
          />
        )}
      </Card>
    </SettingsContainer>
  );
};

export default PrivacySettings;
