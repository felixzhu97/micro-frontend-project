import CryptoUtils from "./crypto";
import SecurityUtils from "./security";

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 增强的存储工具，支持加密和过期检查
export const storage = {
  // 普通存储（不加密）
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  // 安全存储（加密）- 用于敏感数据
  getSecure: (key: string): string | null => {
    try {
      const encryptedItem = localStorage.getItem(`${key}_encrypted`);
      if (!encryptedItem) return null;

      const data = JSON.parse(encryptedItem);

      // 检查是否过期（24小时）
      if (SecurityUtils.isSessionExpired(data.timestamp, 24 * 60 * 60 * 1000)) {
        storage.removeSecure(key);
        return null;
      }

      return CryptoUtils.decrypt(data.value);
    } catch (error) {
      console.error("Error reading secure data:", error);
      return null;
    }
  },

  setSecure: (key: string, value: string): void => {
    try {
      const encrypted = CryptoUtils.encrypt(value);
      const data = {
        value: encrypted,
        timestamp: Date.now(),
        salt: CryptoUtils.generateSalt(),
      };

      localStorage.setItem(`${key}_encrypted`, JSON.stringify(data));

      // 清理原始未加密数据（如果存在）
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error writing secure data:", error);
    }
  },

  removeSecure: (key: string): void => {
    try {
      localStorage.removeItem(`${key}_encrypted`);
      localStorage.removeItem(key); // 也清理可能存在的未加密版本
    } catch (error) {
      console.error("Error removing secure data:", error);
    }
  },

  // 清理所有过期数据
  cleanupExpired: (): void => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.endsWith("_encrypted")) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            if (
              data.timestamp &&
              SecurityUtils.isSessionExpired(data.timestamp)
            ) {
              localStorage.removeItem(key);
            }
          } catch {
            // 如果解析失败，可能是损坏数据，删除它
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  },

  // 获取存储使用情况
  getUsageInfo: () => {
    try {
      let totalSize = 0;
      let encryptedSize = 0;

      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const size = localStorage[key].length;
          totalSize += size;

          if (key.endsWith("_encrypted")) {
            encryptedSize += size;
          }
        }
      }

      return {
        totalSize,
        encryptedSize,
        itemCount: localStorage.length,
        quota: navigator.storage ? "available" : "unknown",
      };
    } catch (error) {
      console.error("Error getting storage info:", error);
      return null;
    }
  },
};

// 在应用启动时清理过期数据
if (typeof window !== "undefined") {
  storage.cleanupExpired();
}

export { CryptoUtils, SecurityUtils };
