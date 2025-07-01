// 安全工具模块
class SecurityUtils {
  // XSS 防护 - 简单的HTML转义
  static sanitizeText(text: string): string {
    if (typeof text !== "string") return "";

    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  // 验证API Key格式
  static validateApiKey(apiKey: string): boolean {
    if (!apiKey || typeof apiKey !== "string") return false;

    const trimmed = apiKey.trim();

    // 基本长度检查
    if (trimmed.length < 10 || trimmed.length > 200) {
      return false;
    }

    // DeepSeek API Key 格式验证 - 更宽松的验证
    // 允许 sk- 开头，后面跟字母、数字、连字符、下划线等
    const pattern = /^sk-[a-zA-Z0-9\-_]{20,}$/;
    return pattern.test(trimmed);
  }

  // 验证用户输入长度和内容
  static validateUserInput(input: string): {
    isValid: boolean;
    error?: string;
  } {
    if (!input || typeof input !== "string") {
      return { isValid: false, error: "输入不能为空" };
    }

    const trimmed = input.trim();

    if (trimmed.length === 0) {
      return { isValid: false, error: "输入不能为空" };
    }

    if (trimmed.length > 2000) {
      return { isValid: false, error: "输入内容过长，请限制在2000字符内" };
    }

    // 检测潜在的恶意内容
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<embed/i,
      /<object/i,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(trimmed)) {
        return { isValid: false, error: "输入包含不安全内容" };
      }
    }

    return { isValid: true };
  }

  // 会话管理 - 检查会话是否过期
  static isSessionExpired(
    timestamp: number,
    maxAgeMs: number = 24 * 60 * 60 * 1000
  ): boolean {
    return Date.now() - timestamp > maxAgeMs;
  }

  // 清理敏感数据
  static clearSensitiveData(): void {
    try {
      // 清理可能包含敏感信息的localStorage项
      const sensitiveKeys = [
        "deepseek_api_key",
        "deepseek_api_key_encrypted",
        "chat_session",
        "user_preferences",
      ];

      sensitiveKeys.forEach((key) => {
        localStorage.removeItem(key);
      });

      // 清理sessionStorage
      sessionStorage.clear();
    } catch (error) {
      console.warn("清理敏感数据时出错:", error);
    }
  }

  // 生成CSP nonce（内容安全策略随机数）
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)));
  }

  // 安全的随机字符串生成
  static generateSecureId(): string {
    const timestamp = Date.now().toString();
    const random = crypto.getRandomValues(new Uint32Array(2));
    return btoa(timestamp + random.join("")).replace(/[+/=]/g, "");
  }

  // 检测是否在安全环境中（HTTPS）
  static isSecureContext(): boolean {
    return (
      window.isSecureContext ||
      location.protocol === "https:" ||
      location.hostname === "localhost"
    );
  }

  // 防抖函数，防止频繁请求
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // 限流函数，防止API滥用
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests: number[] = [];

    return () => {
      const now = Date.now();
      const windowStart = now - windowMs;

      // 清理过期请求
      while (requests.length > 0 && requests[0] < windowStart) {
        requests.shift();
      }

      if (requests.length >= maxRequests) {
        return false; // 超出限制
      }

      requests.push(now);
      return true; // 允许请求
    };
  }
}

export default SecurityUtils;
